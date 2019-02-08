import MethodRegistry from 'eth-method-registry'
import Eth from 'ethjs'
import { IMethod } from './types'

const provider = new Eth.HttpProvider('https://mainnet.infura.io')
const registry = new MethodRegistry({ provider })

export const lookupMethod = async (hash: string): Promise<IMethod> => {
  let result = null
  try {
    // console.log('lookupMethod hash', hash)

    if (hash && typeof hash === 'string') {
      const signature = await registry.lookup(hash)

      // console.log('lookupMethod signature', signature)

      if (signature) {
        const parsed = registry.parse(signature)

        // console.log('lookupMethod parsed', !!parsed)
        result = { signature, ...parsed }
      }
    }

    // console.log('lookupMethod result', !!result)
  } catch (error) {
    console.error(error)
  }
  return result
}
