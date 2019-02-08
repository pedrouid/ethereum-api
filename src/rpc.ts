import axios from 'axios'
import { getChainData, payloadId } from './utilities'
import { convertHexToString } from './bignumber'

export const apiGetAccountNonce = async (
  address: string,
  chainId: number
): Promise<any> => {
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

  const nonce = convertHexToString(response.data.result)
  return nonce
}
