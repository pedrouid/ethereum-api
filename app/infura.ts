import axios from 'axios'
import { convertHexToString } from './bignumber'
import { getNakedAddress, getDataString } from './utilities'

const erc20contract = {
  transfer: {
    method: 'transfer(address,uint256)',
    hash: '0xa9059cbb'
  },
  balanceOf: {
    method: 'balanceOf(address)',
    hash: '0x70a08231'
  }
}

/**
 * @desc infura rpc request ethereum balance
 * @param  {String}  [address = '']
 * @param  {String}  [network = 'mainnet']
 * @return {Promise}
 */
export const infuraGetEthereumBalance = async (
  address: string = '',
  network: string = 'mainnet',
  block = 'latest'
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.infura.io/v1/jsonrpc/${network}/eth_getBalance?params=["${address}","${block}"]`
    )
    const result = convertHexToString(response.data.result)
    return result
  } catch (error) {
    throw error
  }
}

/**
 * @desc infura rpc request transaction count
 * @param  {String}  [address='']
 * @param  {String}  [network='mainnet']
 * @return {Promise}
 */
export const infuraGetTransactionCount = async (
  address: string = '',
  network: string = 'mainnet',
  block = 'pending'
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.infura.io/v1/jsonrpc/${network}/eth_getTransactionCount?params=["${address}","${block}"]`
    )
    const result = convertHexToString(response.data.result)
    return result
  } catch (error) {
    throw error
  }
}

/**
 * @desc infura rpc request token balance
 * @param  {String}  [accountAddress='']
 * @param  {String}  [tokenAddress='']
 * @param  {String}  [network='mainnet']
 * @return {Promise}
 */
export const infuraCallTokenBalance = async (
  accountAddress: string = '',
  tokenAddress: string = '',
  network: string = 'mainnet'
): Promise<any> => {
  try {
    const balanceMethodHash = erc20contract.balanceOf.hash
    const dataString = getDataString(balanceMethodHash, [
      getNakedAddress(accountAddress)
    ])
    const response = await axios.get(
      `https://api.infura.io/v1/jsonrpc/${network}/eth_call?params=[{"to":"${tokenAddress}","data":"${dataString}"},"latest"]`
    )
    const result = convertHexToString(response.data.result)
    return result
  } catch (error) {
    throw error
  }
}

/**
 * @desc infura rpc request transaction by hash
 * @param  {String}  [address='']
 * @param  {String}  [network='mainnet']
 * @return {Promise}
 */
export const infuraGetTransactionByHash = async (
  hash = '',
  network: string = 'mainnet'
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.infura.io/v1/jsonrpc/${network}/eth_getTransactionByHash?params=["${hash}"]`
    )
    const result = response.data.result
    return result
  } catch (error) {
    throw error
  }
}

/**
 * @desc infura rpc request block by hash
 * @param  {String}  [address='']
 * @param  {String}  [network='mainnet']
 * @return {Promise}
 */
export const infuraGetBlockByHash = async (
  hash = '',
  network: string = 'mainnet'
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.infura.io/v1/jsonrpc/${network}/eth_getBlockByHash?params=["${hash}", false]`
    )
    const result = response.data.result
    return result
  } catch (error) {
    throw error
  }
}
