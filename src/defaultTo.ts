/**
 * Checks `value` to determine whether a default value should be returned in
 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
 * or `undefined`.
 *
 * @since 5.12.0
 * @category Util
 * @param value The value to check.
 * @param defaultValue The default value.
 * @returns Returns the resolved value.
 * @example
 *
 * ```
 * defaultTo(1, 10)
 * // => 1
 *
 * defaultTo(undefined, 10)
 * // => 10
 * ```
 */
export function defaultTo<T>(value: any, defaultValue: T): T {
  return (value == null || value !== value) ? defaultValue : value;
}

export default defaultTo;
