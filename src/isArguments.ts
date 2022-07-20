import getTag from "./.internal/getTag";
import isObjectLike from "./isObjectLike";

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * ```js
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 * ```
 */
export function isArguments(value: any): value is IArguments {
  return isObjectLike(value) && getTag(value) == "[object Arguments]";
}

export default isArguments;
