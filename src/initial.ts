import slice from './slice';

/**
 * Gets all but the last element of `array`.
 *
 * @since 5.18.0
 * @category Array
 * @param array The array to query.
 * @returns Returns the slice of `array`.
 * @example
 *
 * ```ts
 * initial([1, 2, 3])
 * // => [1, 2]
 * ```
 */
export function initial<T = any>(array: Array<T>): Array<T> {
  const length = array == null ? 0 : array.length;
  return length ? slice(array, 0, -1) : [];
}

export default initial;
