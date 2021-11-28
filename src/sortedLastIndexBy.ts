import baseSortedIndexBy from "./.internal/baseSortedIndexBy";
import { ArrayIteratee } from "./types";
import getIteratee from "./.internal/getIteratee";

/**
 * This method is like `sortedLastIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @since 5.11.0
 * @category Array
 * @param array The sorted array to inspect.
 * @param value The value to evaluate.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the index at which `value` should be inserted into `array`.
 * @example
 *
 * ```js
 * const objects = [{ 'n': 4 }, { 'n': 5 }]
 *
 * sortedLastIndexBy(objects, { 'n': 4 }, ({ n }) => n)
 * // => 1
 * ```
 */
export function sortedLastIndexBy<T = any>(array: Array<T>, value: T, iteratee: ArrayIteratee<T, number>): number {
  return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
}

export default sortedLastIndexBy;
