import castSlice from './.internal/castSlice';
import charsStartIndex from './.internal/charsStartIndex';
import stringToArray from './.internal/stringToArray';

const methodName =  ''.trimLeft ? 'trimLeft' : 'trimStart';

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @since 5.6.0
 * @category String
 * @param str The string to trim.
 * @param chars The characters to trim.
 * @returns Returns the trimmed string.
 * @see trim, trimEnd
 * @example
 *
 * trimStart('  abc  ')
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-')
 * // => 'abc-_-'
 */
export function trimStart(str: string, chars: string): string {
  if (str && chars === undefined) {
    return str[methodName]();
  }
  if (!str || !chars) {
    return (str || '');
  }
  const strSymbols = stringToArray(str);
  const start = charsStartIndex(strSymbols, stringToArray(chars));
  return castSlice(strSymbols, start).join('');
}

export default trimStart;
