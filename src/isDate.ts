import getTag from "./.internal/getTag";
import isObjectLike from "./isObjectLike";

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * ```js
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 * ```
 */
export function isDate(value: any): value is Date {
  return isObjectLike(value) && getTag(value) == "[object Date]";
}
export default isDate;
