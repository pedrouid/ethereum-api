/**
 * @desc debounce api request
 * @param  {Function}  request
 * @param  {Array}     params
 * @param  {Number}    timeout
 * @return {Promise}
 */
export const debounceRequest = (
  request: Function,
  params: Array<any>,
  timeout: number
): Promise<any> => {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        request(...params)
          .then((res: any) => resolve(res))
          .catch((err: Error) => reject(err)),
      timeout
    )
  )
}

/**
 * @desc capitalize string
 * @param  {String} [string]
 * @return {String}
 */
export const capitalize = (value: string): string =>
  value
    .split(' ')
    .map(
      (word: string): string =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ')

/**
 * @desc pad string to specific width and padding
 * @param  {String} n
 * @param  {Number} width
 * @param  {String} z
 * @return {String}
 */
export const padLeft = (n: string, width: number, z?: string): string => {
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

/**
 * @desc get ethereum contract call data string
 * @param  {String} func
 * @param  {Array}  arrVals
 * @return {String}
 */
export const getDataString = (func: string, arrVals: Array<any>): string => {
  let val = ''
  for (let i = 0; i < arrVals.length; i++) val += padLeft(arrVals[i], 64)
  const data = func + val
  return data
}

/**
 * @desc get naked ethereum address
 * @param  {String} address
 * @return {String}
 */
export const getNakedAddress = (address: string): string =>
  address.toLowerCase().replace('0x', '')

/** s
 * @desc sanitize hexadecimal string
 * @param  {String} hex
 * @return {String}
 */
export const sanitizeHex = (hex: string): string => {
  hex = hex.substring(0, 2) === '0x' ? hex.substring(2) : hex
  if (hex === '') return ''
  hex = hex.length % 2 !== 0 ? '0' + hex : hex
  return '0x' + hex
}
