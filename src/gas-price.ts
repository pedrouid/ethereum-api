import axios from 'axios'
import { IGasPrices } from './types'
import { convertStringToNumber, divide, multiply } from './bignumber'

export const apiGetGasPrices = async (): Promise<IGasPrices> => {
  const { data } = await axios.get(
    `https://ethgasstation.info/json/ethgasAPI.json`
  )
  const result: IGasPrices = {
    timestamp: Date.now(),
    slow: {
      time: convertStringToNumber(multiply(data.safeLowWait, 60)),
      price: convertStringToNumber(divide(data.safeLow, 10))
    },
    average: {
      time: convertStringToNumber(multiply(data.avgWait, 60)),
      price: convertStringToNumber(divide(data.average, 10))
    },
    fast: {
      time: convertStringToNumber(multiply(data.fastestWait, 60)),
      price: convertStringToNumber(divide(data.fastest, 10))
    }
  }
  return result
}
