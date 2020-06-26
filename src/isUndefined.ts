/**
 * Checks if `value` is `undefined`.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * ```js
 * isUndefined(void 0)
 * // => true
 *
 * isUndefined(null)
 * // => false
 * ```
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

export default isUndefined;
