// @ts-nocheck
import getTag from "./.internal/getTag";


/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * ```js
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 * ```
 */
export function isString(value: any): value is string {
  const type = typeof value;
  return type === "string" ||
    (
      type === "object" &&
      value != null &&
      !Array.isArray(value) &&
      getTag(value) == "[object String]"
    );
}

export default isString;
