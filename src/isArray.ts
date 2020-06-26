
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * ```js
 * isArray([1, 2, 3]);
 * // => true
 *
 * isArray(document.body.children);
 * // => false
 *
 * isArray('abc');
 * // => false
 *
 * isArray(noop);
 * // => false
 * ```
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export default isArray;
