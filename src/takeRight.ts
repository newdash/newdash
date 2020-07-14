import toInteger from './toInteger';
import baseSlice from './.internal/baseSlice';

/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @since 5.6.0
 * @category Array
 * @param array The array to query.
 * @param n The number of elements to take.
 * @returns Returns the slice of `array`.
 * @example
 *
 * ```js
 * takeRight([1, 2, 3])
 * // => [3]
 *
 * takeRight([1, 2, 3], 2)
 * // => [2, 3]
 *
 * takeRight([1, 2, 3], 5)
 * // => [1, 2, 3]
 *
 * takeRight([1, 2, 3], 0)
 * // => []
 * ```
 */
export function takeRight<T>(array: ArrayLike<T>, n?: number): Array<T>;
export function takeRight(array: any, n = 1, guard?: any): any {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, n < 0 ? 0 : n, length);
}

export default takeRight;
