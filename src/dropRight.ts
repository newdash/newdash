import slice from './slice';
import toInteger from './toInteger';

/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @since 5.16.0
 * @category Array
 * @param array The array to query.
 * @param n The number of elements to drop.
 * @returns Returns the slice of `array`.
 * @example
 *
 * ```js
 * dropRight([1, 2, 3])
 * // => [1, 2]
 *
 * dropRight([1, 2, 3], 2)
 * // => [1]
 *
 * dropRight([1, 2, 3], 5)
 * // => []
 *
 * dropRight([1, 2, 3], 0)
 * // => [1, 2, 3]
 * ```
 */
export function dropRight<T>(array: Array<T>, n = 1): Array<T> {
  const length = array == null ? 0 : array.length;
  n = length - toInteger(n);
  return length ? slice(array, 0, n < 0 ? 0 : n) : [];
}

export default dropRight;
