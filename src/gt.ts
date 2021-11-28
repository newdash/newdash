/**
 * Checks if `value` is greater than `other`.
 *
 * @since 5.7.0
 * @category Lang
 * @param value The value to compare.
 * @param other The other value to compare.
 * @returns Returns `true` if `value` is greater than `other`,
 *  else `false`.
 * @see [[gte]], [[lt]], [[lte]]
 * @example
 *
 * ```js
 * gt(3, 1)
 * // => true
 *
 * gt(3, 3)
 * // => false
 *
 * gt(1, 3)
 * // => false
 * ```
 */
export function gt<T>(value: T, other: T): boolean;
export function gt(value: any, other: any): any {
  if (!(typeof value === "string" && typeof other === "string")) {
    value = +value;
    other = +other;
  }
  return value > other;
}

export default gt;
