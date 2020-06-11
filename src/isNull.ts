/**
 * Checks if `value` is `null`.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * ```js
 * isNull(null)
 * // => true
 *
 * isNull(void 0)
 * // => false
 * ```
 */
function isNull(value: any): value is null {
  return value === null;
}

export default isNull;
