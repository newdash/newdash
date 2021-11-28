import baseSortedIndex from "./.internal/baseSortedIndex";
import eq from "./eq";

/**
 * This method is like `lastIndexOf` except that it performs a binary
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
 * sortedLastIndexOf([4, 5, 5, 5, 6], 5)
 * // => 3
 * ```
 */
export function sortedLastIndexOf<T>(array: Array<T>, value: T): number  {
  const length = array == null ? 0 : array.length;
  if (length) {
    const index = baseSortedIndex(array, value, true) - 1;
    if (eq(array[index], value)) {
      return index;
    }
  }
  return -1;
}

export default sortedLastIndexOf;
