"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BigNumber = __importStar(require("bignumber.js"));
/**
 * @desc count value's number of decimals places
 * @param  {String}   value
 * @return {String}
 */
exports.countDecimalPlaces = function (value) { return BigNumber("" + value).dp(); };
/**
 * @desc convert from number to string
 * @param  {Number}  value
 * @return {String}
 */
exports.convertNumberToString = function (value) { return BigNumber("" + value).toString(); };
/**
 * @desc convert from string to number
 * @param  {String}  value
 * @return {Number}
 */
exports.convertStringToNumber = function (value) { return BigNumber("" + value).toNumber(); };
/**
 * @desc convert hex to number string
 * @param  {String} hex
 * @return {String}
 */
exports.convertHexToString = function (hex) { return BigNumber("" + hex).toString(); };
/**
 * @desc convert number to string to hex
 * @param  {String} string
 * @return {String}
 */
exports.convertStringToHex = function (string) { return BigNumber("" + string).toString(16); };
/**
 * @desc compares if numberOne is greater than numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.greaterThan = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne).comparedTo(BigNumber("" + numberTwo)) === 1;
};
/**
 * @desc compares if numberOne is greater than or equal to numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.greaterThanOrEqual = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne).comparedTo(BigNumber("" + numberTwo)) >= 0;
};
/**
 * @desc compares if numberOne is smaller than numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.smallerThan = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne).comparedTo(BigNumber("" + numberTwo)) === -1;
};
/**
 * @desc compares if numberOne is smaller than or equal to numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.smallerThanOrEqual = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne).comparedTo(BigNumber("" + numberTwo)) <= 0;
};
/**
 * @desc multiplies two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.multiply = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne)
        .times(BigNumber("" + numberTwo))
        .toString();
};
/**
 * @desc divides two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.divide = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne)
        .dividedBy(BigNumber("" + numberTwo))
        .toString();
};
/**
 * @desc real floor divides two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.floorDivide = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne)
        .dividedToIntegerBy(BigNumber("" + numberTwo))
        .toString();
};
/**
 * @desc modulos of two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.mod = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne)
        .mod(BigNumber("" + numberTwo))
        .toString();
};
/**
 * @desc adds two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.add = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne)
        .plus(BigNumber("" + numberTwo))
        .toString();
};
/**
 * @desc subtracts two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
exports.subtract = function (numberOne, numberTwo) {
    return BigNumber("" + numberOne)
        .minus(BigNumber("" + numberTwo))
        .toString();
};
/**
 * @desc convert from amount value to raw number format
 * @param  {String|Number}  value
 * @return {BigNumber}
 */
exports.convertAmountToRawNumber = function (value, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return BigNumber("" + value)
        .times(BigNumber('10').pow(decimals))
        .toString();
};
/**
 * @desc convert to amount value from raw number format
 * @param  {BigNumber}  value
 * @return {String}
 */
exports.convertAmountFromRawNumber = function (value, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return BigNumber("" + value)
        .dividedBy(BigNumber('10').pow(decimals))
        .toString();
};
/**
 * @desc handle signficant decimals in display format
 * @param  {String}   value
 * @param  {Number}   decimals
 * @param  {Number}   buffer
 * @return {String}
 */
exports.handleSignificantDecimals = function (value, decimals, buffer) {
    if (!BigNumber("" + decimals).isInteger() ||
        (buffer && !BigNumber("" + buffer).isInteger())) {
        return null;
    }
    buffer = buffer ? exports.convertStringToNumber(buffer) : 3;
    decimals = exports.convertStringToNumber(decimals);
    if (exports.smallerThan(BigNumber("" + value).abs(), 1)) {
        decimals =
            value
                .slice(2)
                .slice('')
                .search(/[^0]/g) + buffer;
        decimals = decimals < 8 ? decimals : 8;
    }
    else {
        decimals = decimals < buffer ? decimals : buffer;
    }
    var result = BigNumber("" + value).toFixed(decimals);
    result = BigNumber("" + result).toString();
    return BigNumber("" + result).dp() <= 2
        ? BigNumber("" + result).toFormat(2)
        : BigNumber("" + result).toFormat();
};
/**
 * @desc format fixed number of decimals
 * @param  {String}   value
 * @param  {Number}   decimals
 * @return {String}
 */
exports.formatFixedDecimals = function (value, decimals) {
    var _value = exports.convertNumberToString(value);
    var _decimals = exports.convertStringToNumber(decimals);
    var result = BigNumber(BigNumber(_value).toFixed(_decimals)).toString();
    return result;
};
/**
 * @desc format inputOne value to signficant decimals given inputTwo
 * @param  {String}   inputOne
 * @param  {String}   inputTwo
 * @return {String}
 */
exports.formatInputDecimals = function (inputOne, inputTwo) {
    var _nativeAmountDecimalPlaces = exports.countDecimalPlaces(inputTwo);
    var decimals = _nativeAmountDecimalPlaces > 8 ? _nativeAmountDecimalPlaces : 8;
    var result = BigNumber(exports.formatFixedDecimals(inputOne, decimals))
        .toFormat()
        .replace(/,/g, '');
    return result;
};
