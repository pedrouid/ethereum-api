import axios from 'axios'
import { getChainData, payloadId } from './utilities'
import { convertHexToString, convertStringToNumber } from './bignumber'

export const apiGetAccountNonce = async (
  address: string,
  chainId: number
): Promise<number> => {
  const rpcUrl = getChainData(chainId).rpc_url

  if (!rpcUrl && typeof rpcUrl !== 'string') {
    throw new Error('Invalid or missing rpc url')
  }

  const response = await axios.post(rpcUrl, {
    jsonrpc: '2.0',
    id: payloadId(),
    method: 'eth_getTransactionCount',
    params: [address, 'pending']
  })

  const nonce = convertStringToNumber(convertHexToString(response.data.result))
  return nonce
}

export const apiGetGasLimit = async (
  contractAddress: string,
  data: string
): Promise<number> => {
  const chainId = 1

  const rpcUrl = getChainData(chainId).rpc_url

  const response = await axios.post(rpcUrl, {
    jsonrpc: '2.0',
    id: payloadId(),
    method: 'eth_estimateGas',
    params: [
      {
        to: contractAddress,
        data
      }
    ]
  })
  const gasLimit = convertStringToNumber(
    convertHexToString(response.data.result)
  )
  return gasLimit
}

export const apiGetBlockNumber = async (chainId: number): Promise<number> => {
  const rpcUrl = getChainData(chainId).rpc_url

  if (!rpcUrl && typeof rpcUrl !== 'string') {
    throw new Error('Invalid or missing rpc url')
  }

  const response = await axios.post(rpcUrl, {
    jsonrpc: '2.0',
    id: payloadId(),
    method: 'eth_blockNumber',
    params: []
  })
  const blockNumber = convertStringToNumber(
    convertHexToString(response.data.result)
  )
  return blockNumber
}
