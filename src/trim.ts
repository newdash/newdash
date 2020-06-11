import castSlice from './.internal/castSlice';
import charsEndIndex from './.internal/charsEndIndex';
import charsStartIndex from './.internal/charsStartIndex';
import stringToArray from './.internal/stringToArray';
import toString from './toString';
import baseToString from './.internal/baseToString';


/**
 * @ignore
 */
const reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @since 5.6.0
 * @category String
 * @param str The string to trim.
 * @param chars The characters to trim.
 * @returns Returns the trimmed string.
 * @see [[trimEnd]],[[trimStart]]
 * @example
 *
 * ```js
 * trim('  abc  ')
 * // => 'abc'
 *
 * trim('-_-abc-_-', '_-')
 * // => 'abc'
 * ```
 */
export function trim(str: string, chars: string, guard?: any): string {
  const string = toString(str);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  const strSymbols = stringToArray(string),
    chrSymbols = stringToArray(chars),
    start = charsStartIndex(strSymbols, chrSymbols),
    end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

export default trim;
