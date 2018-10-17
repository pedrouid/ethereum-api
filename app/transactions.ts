import axios from 'axios'
import { multiply, convertAmountToRawNumber } from './bignumber'

const parseAccountTransactions = async (
  data: any | null = null,
  address: string = '',
  network: string = ''
): Promise<any> => {
  if (!data || !data.docs) return []

  let transactions = await Promise.all(
    data.docs.map(async (tx: any, idx: number) => {
      const hash = tx._id
      const timestamp = {
        secs: `${tx.timeStamp}`,
        ms: `${tx.timeStamp}000`
      }
      const error = !!tx.error
      let interaction = false
      let from = tx.from
      let to = tx.to
      let asset = {
        name: 'Ethereum',
        symbol: 'ETH',
        address: null,
        decimals: 18
      }
      let value = {
        amount: tx.value
      }
      let totalGas = multiply(tx.gasUsed, tx.gasPrice)
      let txFee = {
        amount: totalGas
      }

      const includesTokenTransfer = (() => {
        if (tx.operations.length) {
          const tokenTransfers = tx.operations.filter(
            (operation: any): any => operation.type === 'token_transfer'
          )
          if (tokenTransfers.length) {
            return true
          }
        }
        return false
      })()

      interaction = !includesTokenTransfer && tx.input !== '0x'

      let result: any = {
        hash,
        timestamp,
        from,
        to,
        error,
        interaction,
        value,
        txFee,
        native: {},
        pending: false,
        asset
      }

      if (includesTokenTransfer) {
        const tokenTransfers: any = []
        if (tx.operations.length) {
          tx.operations.forEach((transferData: any, idx: any) => {
            const transferTx = {
              hash: `${result.hash}-${idx + 1}`,
              timestamp,
              from,
              to,
              error,
              interaction,
              value,
              txFee,
              native: {},
              pending: false,
              asset
            }
            const name = !transferData.contract.name.startsWith('0x')
              ? transferData.contract.name
              : transferData.contract.symbol || 'Unknown Token'
            transferTx.asset = {
              name: name,
              symbol: transferData.contract.symbol || '———',
              address: transferData.contract.address || '',
              decimals: transferData.contract.decimals || 18
            }

            transferTx.from = transferData.from
            transferTx.to = transferData.to
            const amount = convertAmountToRawNumber(
              transferData.value,
              transferTx.asset.decimals
            )
            transferTx.value = {
              amount
            }
            tokenTransfers.push(transferTx)
          })
          if (!Number(tx.value)) {
            result = [...tokenTransfers]
          } else {
            result.hash = `${result.hash}-0`
            result = [...tokenTransfers, result]
          }
        }
      }

      return result
    })
  )
  let _transactions: any = []

  transactions.forEach(tx => {
    if (Array.isArray(tx)) {
      tx.forEach(subTx => {
        _transactions.push(subTx)
      })
    } else {
      _transactions.push(tx)
    }
  })

  if (data.pages > data.page) {
    try {
      const newPageResponse = await axios.get(
        `https://${
          network === 'mainnet' ? `api` : network
        }.trustwalletapp.com/transactions?address=${address}&limit=50&page=${data.page +
          1}`
      )
      const newPageTransations = await parseAccountTransactions(
        newPageResponse.data,
        address,
        network
      )
      _transactions = [..._transactions, ...newPageTransations]
    } catch (error) {
      throw error
    }
  }

  return _transactions
}

export const filterNewTransactions = (transactions: any, lastTxHash: any) => {
  let result = transactions
  if (lastTxHash) {
    let newTxs = true
    result = transactions.filter(
      (tx: any): boolean => {
        if (tx.hash === lastTxHash && newTxs) {
          newTxs = false
          return false
        } else if (tx.hash !== lastTxHash && newTxs) {
          return true
        } else {
          return false
        }
      }
    )
  }
  return result
}

export const apiProxyGetAccountTransactions = async (
  address = '',
  network = 'mainnet',
  lastTxHash = null
) => {
  try {
    const { data } = await axios.get(
      `https://${
        network === 'mainnet' ? `api` : network
      }.trustwalletapp.com/transactions?address=${address}&limit=50&page=1`
    )
    let transactions = await parseAccountTransactions(data, address, network)
    if (transactions.length) {
      transactions = filterNewTransactions(transactions, lastTxHash)
    }
    return transactions
  } catch (error) {
    throw error
  }
}

export const handler = async (event: any, context: any, callback: Function) => {
  try {
    const { address, network, lastTxHash } = event.queryStringParameters
    let transactions = []
    transactions = await apiProxyGetAccountTransactions(
      address,
      network,
      lastTxHash
    )
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(transactions)
    })
  } catch (error) {
    console.error(error)
    callback(null, {
      statusCode: 500,
      body: 'Something went wrong'
    })
  }
}
