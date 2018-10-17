import { BigNumber } from 'bignumber.js'

/**
 * @desc count value's number of decimals places
 * @param  {String}   value
 * @return {Number}
 */
export const countDecimalPlaces = (value: string | number): number =>
  new BigNumber(`${value}`).dp()

/**
 * @desc convert from number to string
 * @param  {Number}  value
 * @return {String}
 */
export const convertNumberToString = (value: string | number): string =>
  new BigNumber(`${value}`).toString()

/**
 * @desc convert from string to number
 * @param  {String}  value
 * @return {Number}
 */
export const convertStringToNumber = (value: string | number): number =>
  new BigNumber(`${value}`).toNumber()

/**
 * @desc convert hex to number string
 * @param  {String} hex
 * @return {String}
 */
export const convertHexToString = (hex: string): string =>
  new BigNumber(`${hex}`).toString()

/**
 * @desc convert number to string to hex
 * @param  {String} value
 * @return {String}
 */
export const convertStringToHex = (value: string | number): string =>
  new BigNumber(`${value}`).toString(16)

/**
 * @desc compares if numberOne is greater than numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {Boolean}
 */
export const greaterThan = (numberOne: number, numberTwo: number): boolean =>
  new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) === 1

/**
 * @desc compares if numberOne is greater than or equal to numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {Boolean}
 */
export const greaterThanOrEqual = (
  numberOne: number,
  numberTwo: number
): boolean =>
  new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) >= 0

/**
 * @desc compares if numberOne is smaller than numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {Boolean}
 */
export const smallerThan = (numberOne: number, numberTwo: number): boolean =>
  new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) === -1

/**
 * @desc compares if numberOne is smaller than or equal to numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {Boolean}
 */
export const smallerThanOrEqual = (
  numberOne: number,
  numberTwo: number
): boolean =>
  new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) <= 0

/**
 * @desc multiplies two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export const multiply = (numberOne: number, numberTwo: number): string =>
  new BigNumber(`${numberOne}`).times(new BigNumber(`${numberTwo}`)).toString()

/**
 * @desc divides two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export const divide = (numberOne: number, numberTwo: number): string =>
  new BigNumber(`${numberOne}`)
    .dividedBy(new BigNumber(`${numberTwo}`))
    .toString()

/**
 * @desc real floor divides two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export const floorDivide = (numberOne: number, numberTwo: number): string =>
  new BigNumber(`${numberOne}`)
    .dividedToIntegerBy(new BigNumber(`${numberTwo}`))
    .toString()

/**
 * @desc modulos of two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export const mod = (numberOne: number, numberTwo: number): string =>
  new BigNumber(`${numberOne}`).mod(new BigNumber(`${numberTwo}`)).toString()

/**
 * @desc adds two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export const add = (numberOne: number, numberTwo: number): string =>
  new BigNumber(`${numberOne}`).plus(new BigNumber(`${numberTwo}`)).toString()

/**
 * @desc subtracts two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export const subtract = (numberOne: number, numberTwo: number): string =>
  new BigNumber(`${numberOne}`).minus(new BigNumber(`${numberTwo}`)).toString()

/**
 * @desc convert from amount value to raw number format
 * @param  {String|Number}  value
 * @return {String}
 */
export const convertAmountToRawNumber = (
  value: string | number,
  decimals = 18
): string =>
  new BigNumber(`${value}`).times(new BigNumber('10').pow(decimals)).toString()

/**
 * @desc convert to amount value from raw number format
 * @param  {BigNumber}  value
 * @return {String}
 */
export const convertAmountFromRawNumber = (
  value: BigNumber,
  decimals = 18
): string =>
  new BigNumber(`${value}`)
    .dividedBy(new BigNumber('10').pow(decimals))
    .toString()

/**
 * @desc handle signficant decimals in display format
 * @param  {String}   value
 * @param  {Number}   decimals
 * @param  {Number}   buffer
 * @return {String}
 */
export const handleSignificantDecimals = (
  value: string,
  decimals: number,
  buffer: number
): string | null => {
  if (
    !new BigNumber(`${decimals}`).isInteger() ||
    (buffer && !new BigNumber(`${buffer}`).isInteger())
  ) {
    return null
  }
  buffer = buffer ? convertStringToNumber(buffer) : 3
  decimals = convertStringToNumber(decimals)
  let absolute = new BigNumber(`${value}`).abs().toNumber()
  if (smallerThan(absolute, 1)) {
    decimals = value.slice(2).search(/[^0]/g) + buffer
    decimals = decimals < 8 ? decimals : 8
  } else {
    decimals = decimals < buffer ? decimals : buffer
  }
  let result = new BigNumber(`${value}`).toFixed(decimals)
  result = new BigNumber(`${result}`).toString()
  return new BigNumber(`${result}`).dp() <= 2
    ? new BigNumber(`${result}`).toFormat(2)
    : new BigNumber(`${result}`).toFormat()
}

/**
 * @desc format fixed number of decimals
 * @param  {String}   value
 * @param  {Number}   decimals
 * @return {String}
 */
export const formatFixedDecimals = (
  value: string,
  decimals: number
): string => {
  const _value = convertNumberToString(value)
  const _decimals = convertStringToNumber(decimals)
  const result = new BigNumber(
    new BigNumber(_value).toFixed(_decimals)
  ).toString()
  return result
}

/**
 * @desc format inputOne value to signficant decimals given inputTwo
 * @param  {String}   inputOne
 * @param  {String}   inputTwo
 * @return {String}
 */
export const formatInputDecimals = (
  inputOne: string,
  inputTwo: string
): string => {
  const _nativeAmountDecimalPlaces = countDecimalPlaces(inputTwo)
  const decimals =
    _nativeAmountDecimalPlaces > 8 ? _nativeAmountDecimalPlaces : 8
  const result = new BigNumber(formatFixedDecimals(inputOne, decimals))
    .toFormat()
    .replace(/,/g, '')
  return result
}
