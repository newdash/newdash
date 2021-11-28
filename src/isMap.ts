import getTag from "./.internal/getTag";
import isObjectLike from "./isObjectLike";

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * ```js
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 * ```
 */
export function isMap(value: any): value is Map<any, any> {
  return isObjectLike(value) && getTag(value) == "[object Map]";
}

export default isMap;
