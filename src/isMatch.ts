import baseIsMatch from "./.internal/baseIsMatch";
import getMatchData from "./.internal/getMatchData";

/**
 * Performs a partial deep comparison between `object` and `source` to
 * determine if `object` contains equivalent property values.
 *
 * **Note:** This method is equivalent to `matches` when `source` is
 * partially applied.
 *
 * Partial comparisons will match empty array and empty object `source`
 * values against any array or object value, respectively. See `isEqual`
 * for a list of supported value comparisons.
 *
 * @since 5.7.0
 * @category Lang
 * @param object The object to inspect.
 * @param source The object of property values to match.
 * @returns Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * ```js
 * const object = { 'a': 1, 'b': 2 }
 *
 * isMatch(object, { 'b': 2 })
 * // => true
 *
 * isMatch(object, { 'b': 1 })
 * // => false
 * ```
 */
export function isMatch<T>(object: T, source: Partial<T>): boolean;
export function isMatch(object: any, source: any): boolean {
  return object === source || baseIsMatch(object, source, getMatchData(source));
}

export default isMatch;
