import isFunction from "./isFunction";
import isLength from "./isLength";

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @since 5.3.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * ```js
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 * ```
 */
export function isArrayLike(value: any): value is ArrayLike<any> {
  return value != null && isLength(value.length) && !isFunction(value);
}

export default isArrayLike;
