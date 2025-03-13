import baseDifference from "./.internal/baseDifference";
import baseFlatten from "./.internal/baseFlatten";
import getIteratee from "./.internal/getIteratee";
import isArrayLikeObject from "./isArrayLikeObject";
import last from "./last";
import type {ArrayIteratee, Keys} from './types';

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
 * @param valuesAndIteratee The values to exclude and an optional iteratee function or property name
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
export function differenceBy<T>(
  array: ArrayLike<T> | null | undefined,
  ...valuesAndIteratee: (T[] | ArrayIteratee<T> | Keys<T>)[]
): T[];
export function differenceBy(array: any, ...valuesAndIteratee: any[]): any {
  let iteratee = last(valuesAndIteratee);
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(valuesAndIteratee, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
    : [];
}

export default differenceBy;
