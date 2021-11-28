import head from "./head";


/**
 * Gets the first element of `array`.
 *
 * @since 5.5.0
 * @category Array
 * @param array The array to query.
 * @returns Returns the first element of `array`.
 * @see [[head]]
 * @example
 *
 * ```js
 * first([1, 2, 3]);
 * // => 1
 *
 * first([]);
 * // => undefined
 * ```
 */
export function first<T>(array: ArrayLike<T>): T | undefined {
  return head(array);
};

export default first;
