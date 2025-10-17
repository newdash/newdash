import baseDifference from "./.internal/baseDifference";
import baseFlatten from "./.internal/baseFlatten";
import isArrayLikeObject from "./isArrayLikeObject";
import last from "./last";
import type {Comparator} from './types';

/**
 * This method is like `difference` except that it accepts `comparator`
 * which is invoked to compare elements of `array` to `values`. The order and
 * references of result values are determined by the first array. The comparator
 * is invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `pullAllWith`, this method returns a new array.
 *
 * @since 5.9.0
 * @category Array
 * @param array The array to inspect.
 * @param valuesAndComparator The values to exclude and an optional comparator function.
 * @returns Returns the new array of filtered values.
 * @example
 *
 * ```js
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 *
 * differenceWith(objects, [{ 'x': 1, 'y': 2 }], isEqual)
 * // => [{ 'x': 2, 'y': 1 }]
 * ```
 */
export function differenceWith<T>(
  array: ArrayLike<T> | null | undefined,
  ...valuesAndComparator: (ArrayLike<T> | Comparator<T>)[]
): T[];
export function differenceWith(array: any, ...valuesAndComparator: any[]): any {
  let comparator = last(valuesAndComparator);
  if (isArrayLikeObject(comparator)) {
    comparator = undefined;
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(valuesAndComparator, 1, isArrayLikeObject, true), undefined, comparator)
    : [];
}

export default differenceWith;
