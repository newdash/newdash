import castSlice from './.internal/castSlice';
import charsEndIndex from './.internal/charsEndIndex';
import charsStartIndex from './.internal/charsStartIndex';
import stringToArray from './.internal/stringToArray';

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trimEnd, trimStart
 * @example
 *
 * trim('  abc  ')
 * // => 'abc'
 *
 * trim('-_-abc-_-', '_-')
 * // => 'abc'
 */
function trim(string, chars) {
  if (string && chars === undefined) {
    return string.trim();
  }
  if (!string || !chars) {
    return (string || '');
  }
  const strSymbols = stringToArray(string);
  const chrSymbols = stringToArray(chars);
  const start = charsStartIndex(strSymbols, chrSymbols);
  const end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

export default trim;
