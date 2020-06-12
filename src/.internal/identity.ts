/**
 * This method returns the first argument it receives.
 *
 * @ignore
 * @private
 * @since 0.1.0
 * @category Util
 * @param value Any value.
 * @returns Returns `value`.
 * @example
 *
 * ```js
 * var object = { 'a': 1 };
 *
 * console.log(identity(object) === object);
 * // => true
 * ```
 */
export function identity<T>(value: T): T {
  return value;
}


export default identity
