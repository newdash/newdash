import slice from './slice';
import toInteger from './toInteger';

/**
 * Creates a slice of `array` with `n` elements dropped from the beginning.
 *
 * @since 5.16.0
 * @category Array
 * @param array The array to query.
 * @param n The number of elements to drop.
 * @returns Returns the slice of `array`.
 * @example
 *
 * ```ts
 * drop([1, 2, 3])
 * // => [2, 3]
 *
 * drop([1, 2, 3], 2)
 * // => [3]
 *
 * drop([1, 2, 3], 5)
 * // => []
 *
 * drop([1, 2, 3], 0)
 * // => [1, 2, 3]
 * ```
 */
export function drop<T>(array: Array<T>, n = 1): Array<T> {
  const length = array == null ? 0 : array.length;
  return length
    ? slice(array, n < 0 ? 0 : toInteger(n), length)
    : [];
}

export default drop;
