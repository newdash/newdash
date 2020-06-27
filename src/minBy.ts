import baseExtremum from './.internal/baseExtremum';
import getIteratee from './.internal/getIteratee';

/**
 * @ignore
 * @private
 * @internal
 */
function baseLt(value: any, other: any): boolean {
  return value < other;
}
/**
 * This method is like `min` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @since 5.8.0
 * @category Math
 * @param array The array to iterate over.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the minimum value.
 * @example
 *
 * ```js
 * const objects = [{ 'n': 1 }, { 'n': 2 }]
 *
 * minBy(objects, ({ n }) => n)
 * // => { 'n': 1 }
 * ```
 */
export function minBy<T>(array: ArrayLike<T>, iteratee?: any): T;
export function minBy(array: any, iteratee?: any): any {
  return (array && array.length)
    ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
    : undefined;
}

export default minBy;
