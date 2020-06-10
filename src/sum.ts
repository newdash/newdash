import baseSum from './.internal/baseSum';

/**
 * Computes the sum of the values in `array`.
 *
 * @since 5.6.0
 * @category Math
 * @param array The array to iterate over.
 * @returns Returns the sum.
 * @example
 *
 * ```js
 * sum([4, 2, 8, 6])
 * // => 20
 * ```
 */
export function sum(array: ArrayLike<number>): number
export function sum(array: any): any {
  return (array != null && array.length)
    ? baseSum(array, (value: any) => value)
    : 0;
}

export default sum;
