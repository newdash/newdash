import baseSortedIndex from "./.internal/baseSortedIndex";

/**
 * This method is like `sortedIndex` except that it returns the highest
 * index at which `value` should be inserted into `array` in order to
 * maintain its sort order.
 *
 * @since 5.11.0
 * @category Array
 * @param array The sorted array to inspect.
 * @param value The value to evaluate.
 * @returns Returns the index at which `value` should be inserted into `array`.
 * @example
 *
 * ```js
 * sortedLastIndex([4, 5, 5, 5, 6], 5)
 * // => 4
 * ```
 */
export function sortedLastIndex<T = any>(array: Array<T>, value: T): number {
  return baseSortedIndex(array, value, true);
}

export default sortedLastIndex;
