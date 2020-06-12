/**
 * Gets a random element from `array`.
 *
 * **NOT** support object
 *
 * @since 5.7.0
 * @category Array
 * @param array The array to sample.
 * @returns Returns the random element.
 * @example
 *
 * ```js
 * sample([1, 2, 3, 4])
 * // => 2
 * ```
 */
export function sample<T>(array: Array<T>): T;
export function sample(array: any): any {
  const length = array == null ? 0 : array.length;
  return length ? array[Math.floor(Math.random() * length)] : undefined;
}

export default sample;
