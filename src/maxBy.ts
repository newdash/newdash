import baseExtremum from './.internal/baseExtremum';
import getIteratee from './.internal/getIteratee';

/**
 * @internal
 * @private
 * @ignore
 * @param value
 * @param other
 */
function baseGt(value: any, other: any): boolean {
  return value > other;
}

/**
 * This method is like `max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @since 5.8.0
 * @category Math
 * @param array The array to iterate over.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the maximum value.
 * @example
 *
 * ```js
 * const objects = [{ 'n': 1 }, { 'n': 2 }]
 *
 * maxBy(objects, ({ n }) => n)
 * // => { 'n': 2 }
 * ```
 */
export function maxBy<T>(array: ArrayLike<T>, iteratee?: any): T;
export function maxBy(array: any, iteratee?: any): any;
export function maxBy(array: any, iteratee?: any): any {
  return (array && array.length)
    ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
    : undefined;
}

export default maxBy;
