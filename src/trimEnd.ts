import baseToString from "./.internal/baseToString";
import castSlice from "./.internal/castSlice";
import charsEndIndex from "./.internal/charsEndIndex";
import stringToArray from "./.internal/stringToArray";
import toString from "./toString";


/**
 * Removes trailing whitespace or specified characters from `string`.
 *
 * @since 5.6.0
 * @category String
 * @param str The string to trim.
 * @param chars The characters to trim.
 * @returns Returns the trimmed string.
 * @see [[trim]],[[trimStart]]
 * @example
 *
 * ```js
 * trimEnd('  abc  ')
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-')
 * // => '-_-abc'
 * ```
 */
export function trimEnd(str: string, chars: string, guard?: any): string {
  const string = toString(str);
  if (string && (guard || chars === undefined)) {
    return string.trimEnd();
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  const strSymbols = stringToArray(string),
    end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

  return castSlice(strSymbols, 0, end).join("");
}

export default trimEnd;
