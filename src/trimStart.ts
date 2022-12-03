import baseToString from "./.internal/baseToString";
import castSlice from "./.internal/castSlice";
import charsStartIndex from "./.internal/charsStartIndex";
import stringToArray from "./.internal/stringToArray";
import toString from "./toString";

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @since 5.6.0
 * @category String
 * @param str The string to trim.
 * @param chars The characters to trim.
 * @returns Returns the trimmed string.
 * @see [[trim]],[[trimEnd]]
 * @example
 *
 * ```js
 * trimStart('  abc  ')
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-')
 * // => 'abc-_-'
 * ```
 */
export function trimStart(str: string, chars: string, guard?: any): string {
  const string = toString(str);
  if (string && (guard || chars === undefined)) {
    return string.trimStart();
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  const strSymbols = stringToArray(string),
    start = charsStartIndex(strSymbols, stringToArray(chars));

  return castSlice(strSymbols, start).join("");
}

export default trimStart;
