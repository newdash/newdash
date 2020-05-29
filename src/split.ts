import castSlice from './.internal/castSlice';
import hasUnicode from './.internal/hasUnicode';
import isRegExp from './isRegExp';
import stringToArray from './.internal/stringToArray';
import isIterateeCall from './.internal/isIterateeCall';
import toString from './toString';
import baseToString from './.internal/baseToString';

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;

/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @since 0.0.3
 * @category String
 * @param {string} [str=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * ```js
 * split('a-b-c', '-', 2)
 * // => ['a', 'b']
 * ```
 */
function split(str?: string, separator?: RegExp | string, limit?: number): Array<string> {
  if (limit && typeof limit != 'number' && isIterateeCall(str, separator, limit)) {
    separator = limit = undefined;
  }
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
  if (!limit) {
    return [];
  }
  str = toString(str);
  if (str && (
    typeof separator == 'string' ||
    (separator != null && !isRegExp(separator))
  )) {
    separator = baseToString(separator);
    if (!separator && hasUnicode(str)) {
      return castSlice(stringToArray(str), 0, limit);
    }
  }
  return str.split(separator, limit);
}


export default split;
