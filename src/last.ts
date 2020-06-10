/**
 * Gets the last element of `array`.
 *
 * @since 5.6.0
 * @category Array
 * @param array The array to query.
 * @returns Returns the last element of `array`.
 * @example
 *
 * ```js
 * last([1, 2, 3])
 * // => 3
 * ```
 */
export function last<T>(array: ArrayLike<T>): T {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

export default last;
