import axios from 'axios'
import { infuraGetEthereumBalance, infuraCallTokenBalance } from './infura'
import { convertAmountToRawNumber, convertStringToNumber } from './bignumber'

const proxyGetAccountBalances = async (address = '', network = 'mainnet') => {
  try {
    const { data } = await axios.get(
      `https://${
        network === 'mainnet' ? `api` : network
      }.trustwalletapp.com/tokens?address=${address}`
    )
    const ethereumBalance = await infuraGetEthereumBalance(address, network)
    const ethereum = {
      balance: ethereumBalance,
      contract: {
        contract: null,
        address: null,
        name: 'Ethereum',
        decimals: 18,
        symbol: 'ETH'
      }
    }
    let tokens: any = []
    if (data.docs && data.docs.length) {
      tokens = await Promise.all(
        data.docs.map(async (token: any) => {
          const balance = await infuraCallTokenBalance(
            address,
            token.contract.address,
            network
          )
          return { ...token, balance }
        })
      )
    }
    let assets = [ethereum, ...tokens]
    assets = await Promise.all(
      assets.map(async assetData => {
        const name = !assetData.contract.name.startsWith('0x')
          ? assetData.contract.name
          : assetData.contract.symbol || 'Unknown Token'
        const asset = {
          name: name,
          symbol: assetData.contract.symbol || '———',
          address: assetData.contract.address || null,
          decimals: convertStringToNumber(assetData.contract.decimals)
        }
        const balance = convertAmountToRawNumber(
          assetData.balance,
          asset.decimals
        )
        return {
          ...asset,
          balance: balance,
          native: null
        }
      })
    )

    assets = assets.filter(
      asset => !!Number(asset.balance.amount) || asset.symbol === 'ETH'
    )

    return {
      address: address,
      type: '',
      assets: assets,
      total: null
    }
  } catch (error) {
    throw error
  }
}

export const handler = async (event: any, context: any, callback: Function) => {
  try {
    const { address, network } = event.queryStringParameters
    const data = await proxyGetAccountBalances(address, network)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.error(error)
    callback(null, {
      statusCode: 500,
      body: 'Something went wrong'
    })
  }
}
