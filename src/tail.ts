/**
 * Gets all but the first element of `array`.
 *
 * @since 5.13.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * ```js
 * tail([1, 2, 3])
 * // => [2, 3]
 * ```
 */
export function tail<T>(array: Array<T>): Array<T> {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  const [, ...result] = array;
  return result;
}

export default tail;
