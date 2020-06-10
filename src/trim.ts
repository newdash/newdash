import castSlice from './.internal/castSlice';
import charsEndIndex from './.internal/charsEndIndex';
import charsStartIndex from './.internal/charsStartIndex';
import stringToArray from './.internal/stringToArray';

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
export function trim(str: string, chars: string): string {
  if (str && chars === undefined) {
    return str.trim();
  }
  if (!str || !chars) {
    return (str || '');
  }
  const strSymbols = stringToArray(str);
  const chrSymbols = stringToArray(chars);
  const start = charsStartIndex(strSymbols, chrSymbols);
  const end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

export default trim;
