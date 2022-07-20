import getTag from "./.internal/getTag";
import isObjectLike from "./isObjectLike";

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * ```js
 * isArrayBuffer(new ArrayBuffer(2))
 * // => true
 *
 * isArrayBuffer(new Array(2))
 * // => false
 * ```
 */
export function isArrayBuffer(value: any): value is ArrayBuffer {
  return isObjectLike(value) && getTag(value) == "[object ArrayBuffer]";
}

export default isArrayBuffer;
