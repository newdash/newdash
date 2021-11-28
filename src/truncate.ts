import baseToString from "./.internal/baseToString";
import castSlice from "./.internal/castSlice";
import hasUnicode from "./.internal/hasUnicode";
import isObject from "./isObject";
import isRegExp from "./isRegExp";
import stringSize from "./.internal/stringSize";
import stringToArray from "./.internal/stringToArray";
import toString from "./toString";

/**
 * @ignore
 * @private
 * @internal
 */
const DEFAULT_TRUNC_LENGTH = 30;

/**
 * @ignore
 * @private
 * @internal
 */
const DEFAULT_TRUNC_OMISSION = "...";

/**
 * @ignore
 * @private
 * @internal
 */
const reFlags = /\w*$/;

/**
 * @ignore
 */
interface Options {
  length?: number;
  omission?: any;
  separator?: RegExp | string;
}

/**
 * @ignore
 */
interface ToStringAble {
  toString(): string;
}

/**
 * Truncates `string` if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * @since 5.6.0
 * @category String
 * @param str The string to truncate.
 * @param options The options object.
 * @returns Returns the truncated string.
 * @see [[replace]]
 * @example
 *
 * ```js
 * truncate('hi-diddly-ho there, neighborino')
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': ' '
 * })
 * // => 'hi-diddly-ho there,...'
 *
 * truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': /,? +/
 * })
 * // => 'hi-diddly-ho there...'
 *
 * truncate('hi-diddly-ho there, neighborino', {
 *   'omission': ' [...]'
 * })
 * // => 'hi-diddly-ho there, neig [...]'
 * ```
 */
export function truncate(str: ToStringAble, options?: Options): string;
export function truncate(str: string, options?: Options): string;
export function truncate(str: any, options?: any): any {
  let separator;
  let length = DEFAULT_TRUNC_LENGTH;
  let omission = DEFAULT_TRUNC_OMISSION;

  if (isObject(options)) {
    separator = "separator" in options ? options.separator : separator;
    length = "length" in options ? options.length : length;
    omission = "omission" in options ? baseToString(options.omission) : omission;
  }

  str = toString(str);

  let strSymbols;
  let strLength = str.length;
  if (hasUnicode(str)) {
    strSymbols = stringToArray(str);
    strLength = strSymbols.length;
  }
  if (length >= strLength) {
    return str;
  }
  let end = length - stringSize(omission);
  if (end < 1) {
    return omission;
  }
  let result = strSymbols
    ? castSlice(strSymbols, 0, end).join("")
    : str.slice(0, end);

  if (separator === undefined) {
    return result + omission;
  }
  if (strSymbols) {
    end += (result.length - end);
  }
  if (isRegExp(separator)) {
    if (str.slice(end).search(separator)) {
      let match;
      let newEnd;
      const substring = result;

      if (!separator.global) {
        // @ts-ignore
        separator = RegExp(separator.source, `${reFlags.exec(separator) || ""}g`);
      }
      separator.lastIndex = 0;
      while ((match = separator.exec(substring))) {
        newEnd = match.index;
      }
      result = result.slice(0, newEnd === undefined ? end : newEnd);
    }
  } else if (str.indexOf(baseToString(separator), end) != end) {
    const index = result.lastIndexOf(separator);
    if (index > -1) {
      result = result.slice(0, index);
    }
  }
  return result + omission;
}

export default truncate;
