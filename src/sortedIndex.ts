import baseSortedIndex from './.internal/baseSortedIndex';

/**
 * Uses a binary search to determine the lowest index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @since 5.11.0
 * @category Array
 * @param array The sorted array to inspect.
 * @param value The value to evaluate.
 * @returns Returns the index at which `value` should be inserted into `array`.
 * @example
 *
 * ```js
 * sortedIndex([30, 50], 40)
 * // => 1
 * ```
 */
export function sortedIndex<T = any>(array: Array<T>, value: T): number {
  return baseSortedIndex(array, value);
}

export default sortedIndex;
