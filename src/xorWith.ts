import baseXor from "./.internal/baseXor";
import isArrayLikeObject from "./isArrayLikeObject";

/**
 * This method is like `xor` except that it accepts `comparator` which is
 * invoked to compare elements of `arrays`. The order of result values is
 * determined by the order they occur in the arrays. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @since 5.7.0
 * @category Array
 * @param arrays The arrays to inspect.
 * @param comparator The comparator invoked per element.
 * @returns Returns the new array of filtered values.
 * @see [[difference]], [[union]], [[unionBy]], [[unionWith]], [[without]], [[xor]], [[xorBy]]
 * @example
 *
 * ```js
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * xorWith(objects, others, isEqual)
 * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 * ```
 */
export function xorWith<T>(comparator: Function, ...arrays: Array<Array<T>>): Array<T> {
  comparator = typeof comparator === "function" ? comparator : undefined;
  return baseXor(arrays.filter(isArrayLikeObject), undefined, comparator);
}

export default xorWith;
