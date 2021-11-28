/**
 * Checks if `value` is less than `other`.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to compare.
 * @param other The other value to compare.
 * @returns Returns `true` if `value` is less than `other`,
 *  else `false`.
 * @see gt, gte, lte
 * @example
 *
 * ```js
 * lt(1, 3)
 * // => true
 *
 * lt(3, 3)
 * // => false
 *
 * lt(3, 1)
 * // => false
 * ```
 */
export function lt<T>(value: T, other: T): boolean;
export function lt(value: any, other: any): any {
  if (!(typeof value === "string" && typeof other === "string")) {
    value = +value;
    other = +other;
  }
  return value < other;
}

export default lt;
