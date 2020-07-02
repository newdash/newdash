import baseIsEqual from './.internal/baseIsEqual';

/**
 * This method is like `isEqual` except that it accepts `customizer` which
 * is invoked to compare values. If `customizer` returns `undefined`, comparisons
 * are handled by the method instead. The `customizer` is invoked with up to
 * six arguments: (objValue, othValue [, index|key, object, other, stack]).
 *
 * @since 5.10.1
 * @category Lang
 * @param value The value to compare.
 * @param other The other value to compare.
 * @param customizer The function to customize comparisons.
 * @returns Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * ```js
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value)
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true
 *   }
 * }
 *
 * const array = ['hello', 'goodbye']
 * const other = ['hi', 'goodbye']
 *
 * isEqualWith(array, other, customizer)
 * // => true
 * ```
 */
export function isEqualWith<V1, V2>(value: V1, other: V2, customizer?: (v1?: V1, v2?: V2) => boolean): boolean;
export function isEqualWith(value: any, other: any, customizer: any): any {
  customizer = typeof customizer === 'function' ? customizer : undefined;
  const result = customizer ? customizer(value, other) : undefined;
  return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
}

export default isEqualWith;
