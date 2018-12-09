import axios from 'axios'

interface ProtocolList {
  [key: string]: Array<string>
}

function verifyChain (protocol: string, network: string): boolean | Error {
  const availableChains: ProtocolList = {
    eth: ['mainnet', 'kovan', 'ropsten', 'rinkeby', 'goerli'],
    poa: ['core', 'sokol', 'dai'],
    etc: ['mainnet']
  }
  if (Object.keys(availableChains).includes(protocol)) {
    if (availableChains[protocol].includes(network)) {
      return true
    } else {
      throw new Error('Network is not available')
    }
  } else {
    throw new Error('Protocol is not available')
  }
}

/**
 * BlockScout API Configuration
 * @type axios instance
 */
const api = axios.create({
  baseURL: 'https://blockscout.com/',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

/**
 *  Get Account Balance
 */
export async function apiGetAccountBalance (
  protocol: string,
  network: string,
  address: string
) {
  verifyChain(protocol, network)
  const module = 'account'
  const action = 'balance'

  const result = await api.get(
    `/${protocol}/${network}/api?module=${module}&action=${action}&address=${address}`
  )
  return result
}

/**
 *  Get Account Token List
 */
export async function apiGetAccountTokenList (
  protocol: string,
  network: string,
  address: string
) {
  verifyChain(protocol, network)
  const module = 'account'
  const action = 'tokenlist'
  const result = await api.get(
    `/${protocol}/${network}/api?module=${module}&action=${action}&address=${address}`
  )
  return result
}

/**
 *  Get Account Token Balance
 */
export async function apiGetAccountTokenBalance (
  protocol: string,
  network: string,
  address: string,
  contractAddress: string
) {
  verifyChain(protocol, network)
  const module = 'account'
  const action = 'tokenbalance'
  const result = await api.get(
    `/${protocol}/${network}/api?module=${module}&action=${action}&contractaddress=${contractAddress}&address=${address}`
  )
  return result
}

interface Asset {
  symbol: string
  name: string
  decimals: string
  contractAddress: string
  balance: string
}

/**
 *  Get Account Full Balances
 */
export async function apiGetAccountFullBalances (
  protocol: string,
  network: string,
  address: string
) {
  verifyChain(protocol, network)

  const nativeCurrency: Asset =
    network.toLowerCase() !== 'dai'
      ? {
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: '18',
        contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
        balance: ''
      }
      : {
        symbol: 'DAI',
        name: 'Dai Stablecoin v1.0',
        decimals: '18',
        contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
        balance: ''
      }

  const balanceRes = await apiGetAccountBalance(protocol, network, address)

  nativeCurrency.balance = balanceRes.data.result

  const tokenListRes = await apiGetAccountTokenList(protocol, network, address)

  const tokenList: Array<Asset> = tokenListRes.data.result

  const tokens: Array<Asset> = await Promise.all(
    tokenList.map(
      async (token: Asset): Promise<Asset> => {
        const tokenBalanceRes = await apiGetAccountTokenBalance(
          protocol,
          network,
          address,
          token.contractAddress
        )

        token.balance = tokenBalanceRes.data.result

        return token
      }
    )
  )

  const fullBalances: Array<Asset> = [nativeCurrency, ...tokens]

  return fullBalances
}
