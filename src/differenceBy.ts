import baseDifference from './.internal/baseDifference';
import baseFlatten from './.internal/baseFlatten';
import isArrayLikeObject from './isArrayLikeObject';
import last from './last';
import getIteratee from './.internal/getIteratee';

/**
 * This method is like `difference` except that it accepts `iteratee` which
 * is invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * **Note:** Unlike `pullAllBy`, this method returns a new array.
 *
 * @since 5.9.0
 * @category Array
 * @param array The array to inspect.
 * @param values The values to exclude.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the new array of filtered values.
 * @example
 *
 * ```js
 * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
 * // => [1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
 * // => [{ 'x': 2 }]
 * ```
 */
export function differenceBy(array: any, ...values: any[]): any {
  let iteratee = last(values);
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
    : [];
}

export default differenceBy;
