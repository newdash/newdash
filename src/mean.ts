import baseMean from './meanBy';

/**
 * Computes the mean of the values in `array`.
 *
 * @since 5.11.0
 * @category Math
 * @param array The array to iterate over.
 * @returns Returns the mean.
 * @example
 *
 * ```js
 * mean([4, 2, 8, 6])
 * // => 5
 * ```
 */
export function mean(array: Array<number>): number {
  return baseMean(array, (value: number) => value);
}

export default mean;
