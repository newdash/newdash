
/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * ```js
 * isNil(null)
 * // => true
 *
 * isNil(void 0)
 * // => true
 *
 * isNil(NaN)
 * // => false
 * ```
 */
export function isNil(value: any): boolean {
  return value == null;
}


export default isNil;
