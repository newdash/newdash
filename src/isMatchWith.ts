import baseIsMatch from './.internal/baseIsMatch';
import getMatchData from './.internal/getMatchData';

/**
 * This method is like `isMatch` except that it accepts `customizer` which
 * is invoked to compare values. If `customizer` returns `undefined`, comparisons
 * are handled by the method instead. The `customizer` is invoked with five
 * arguments: (objValue, srcValue, index|key, object, source).
 *
 * @since 5.10.0
 * @category Lang
 * @param object The object to inspect.
 * @param source The object of property values to match.
 * @param customizer The function to customize comparisons.
 * @returns Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * ```js
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value)
 * }
 *
 * function customizer(objValue, srcValue) {
 *   if (isGreeting(objValue) && isGreeting(srcValue)) {
 *     return true
 *   }
 * }
 *
 * const object = { 'greeting': 'hello' }
 * const source = { 'greeting': 'hi' }
 *
 * isMatchWith(object, source, customizer)
 * // => true
 * ```
 */
export function isMatchWith<V1, V2>(object: V1, source: V2, customizer: (v1?: V1, v2?: V2) => boolean): boolean;
export function isMatchWith(object: any, source: any, customizer: any): any {
  customizer = typeof customizer === 'function' ? customizer : undefined;
  return baseIsMatch(object, source, getMatchData(source), customizer);
}

export default isMatchWith;
