import getTag from "./.internal/getTag";
import isObjectLike from "./isObjectLike";

/**
 * Used to match `toStringTag` values of typed arrays.
 * @ignore
 */
const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * ```js
 * isTypedArray(new Uint8Array)
 * // => true
 *
 * isTypedArray([])
 * // => false
 * ```
 */
export function isTypedArray(value: any): boolean {
  return isObjectLike(value) && reTypedTag.test(getTag(value));
}

export default isTypedArray;
