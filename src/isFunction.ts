
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * ```js
 * isFunction(class Any{})
 * // => true
 *
 * isFunction(() => {})
 * // => true
 *
 * isFunction(async () => {})
 * // => true
 *
 * isFunction(function * Any() {})
 * // => true
 *
 * isFunction(Math.round)
 * // => true
 *
 * isFunction(/abc/)
 * // => false
 * ```
 */
function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export default isFunction;
