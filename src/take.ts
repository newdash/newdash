import toInteger from "./toInteger";
import baseSlice from "./.internal/baseSlice";

/**
 * Creates a slice of `array` with `n` elements taken from the beginning.
 *
 * @since 5.6.0
 * @category Array
 * @param array The array to query.
 * @param n The number of elements to take.
 * @returns Returns the slice of `array`.
 * @example
 *
 * ```js
 * take([1, 2, 3])
 * // => [1]
 *
 * take([1, 2, 3], 2)
 * // => [1, 2]
 *
 * take([1, 2, 3], 5)
 * // => [1, 2, 3]
 *
 * take([1, 2, 3], 0)
 * // => []
 * ```
 */
export function take<T>(array: ArrayLike<T>, n?: number, guard?: any): Array<T>;
export function take(array: any, n = 1, guard: any): any {
  if (!(array && array.length)) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  return baseSlice(array, 0, n < 0 ? 0 : n);
}

export default take;
