/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @since 5.7.0
 * @category Lang
 * @param value The value to compare.
 * @param other The other value to compare.
 * @returns Returns `true` if `value` is greater than or equal to
 *  `other`, else `false`.
 * @see [[gt]], [[lt]], [[lte]]
 * @example
 *
 * ```js
 * gte(3, 1)
 * // => true
 *
 * gte(3, 3)
 * // => true
 *
 * gte(1, 3)
 * // => false
 * ```
 */
export function gte<T>(value: T, other: T): boolean;
export function gte(value: any, other: any): any {
  if (!(typeof value === "string" && typeof other === "string")) {
    value = +value;
    other = +other;
  }
  return value >= other;
}

export default gte;
