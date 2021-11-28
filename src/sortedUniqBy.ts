import baseSortedUniq from "./.internal/baseSortedUniq";
import getIteratee from "./.internal/getIteratee";
import { ArrayIteratee } from "./types";

/**
 * This method is like `uniqBy` except that it's designed and optimized
 * for sorted arrays.
 *
 * @since 5.12.0
 * @category Array
 * @param array The array to inspect.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the new duplicate free array.
 * @example
 *
 * ```js
 * sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor)
 * // => [1.1, 2.3]
 * ```
 */
export function sortedUniqBy<T = any>(array: Array<T>, iteratee: ArrayIteratee<T>): Array<T>
export function sortedUniqBy(array: any, iteratee: any): any {
  return (array && array.length)
    ? baseSortedUniq(array, getIteratee(iteratee, 2))
    : [];
}

export default sortedUniqBy;
