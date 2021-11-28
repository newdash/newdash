import baseSum from "./.internal/baseSum";
import getIteratee from "./.internal/getIteratee";

/**
 * This method is like `sum` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be summed.
 * The iteratee is invoked with one argument: (value).
 *
 * @since 5.6.0
 * @category Math
 * @param array The array to iterate over.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the sum.
 * @example
 *
 * ```js
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * sumBy(objects, ({ n }) => n)
 * // => 20
 * ```
 */
export function sumBy(array: any, iteratee: any): number {
  return (array != null && array.length)
    ? baseSum(array, getIteratee(iteratee))
    : 0;
}

export default sumBy;
