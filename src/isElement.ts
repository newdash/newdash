import isObjectLike from "./isObjectLike";
import isPlainObject from "./isPlainObject";

/**
 * Checks if `value` is likely a DOM element.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * ```js
 * isElement(document.body)
 * // => true
 *
 * isElement('<body>')
 * // => false
 * ```
 */
export function isElement(value: any): value is Element {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

export default isElement;
