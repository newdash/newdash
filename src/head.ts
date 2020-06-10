/**
 * Gets the first element of `array`.
 *
 * @since 5.0.0
 * @alias first
 * @category Array
 * @param array The array to query.
 * @returns Returns the first element of `array`.
 * @see last
 * @example
 *
 * ```js
 * head([1, 2, 3])
 * // => 1
 *
 * head([])
 * // => undefined
 * ```
 */
export function head<T>(array: ArrayLike<T>): T | undefined {
  return (array != null && array.length)
    ? array[0]
    : undefined;
}

export default head;
