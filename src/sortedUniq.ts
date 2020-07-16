import baseSortedUniq from './.internal/baseSortedUniq';

/**
 * This method is like `uniq` except that it only works
 * for sorted arrays.
 * If the input array is known to be sorted `sortedUniq` is
 * faster than `uniq`.
 *
 * @since 5.12.0
 * @category Array
 * @param array The array to inspect.
 * @returns Returns the new duplicate free array.
 * @example
 *
 * ```js
 * sortedUniq([1, 1, 2])
 * // => [1, 2]
 * ```
 */
export function sortedUniq<T>(array: Array<T>): Array<T> {
  return (array && array.length)
    ? baseSortedUniq(array)
    : [];
}

export default sortedUniq;
