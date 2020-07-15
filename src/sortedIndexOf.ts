import baseSortedIndex from './.internal/baseSortedIndex';
import eq from './eq';

/**
 * This method is like `indexOf` except that it performs a binary
 * search on a sorted `array`.
 *
 * @since 5.11.0
 * @category Array
 * @param array The array to inspect.
 * @param value The value to search for.
 * @returns Returns the index of the matched value, else `-1`.
 * @example
 *
 * ```js
 * sortedIndexOf([4, 5, 5, 5, 6], 5)
 * // => 1
 * ```
 */
export function sortedIndexOf<T>(array: Array<T>, value: T): number {
  const length = array == null ? 0 : array.length;
  if (length) {
    const index = baseSortedIndex(array, value);
    if (index < length && eq(array[index], value)) {
      return index;
    }
  }
  return -1;
}

export default sortedIndexOf;
