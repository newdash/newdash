import baseDifference from "./.internal/baseDifference";
import baseFlatten from "./.internal/baseFlatten";
import isArrayLikeObject from "./isArrayLikeObject";

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `pullAll`, this method returns a new array.
 *
 * @since 5.9.0
 * @category Array
 * @param array The array to inspect.
 * @param values The values to exclude.
 * @returns Returns the new array of filtered values.
 * @see union, unionBy, unionWith, without, xor, xorBy, xorWith,
 * @example
 *
 * ```js
 * difference([2, 1], [2, 3])
 * // => [1]
 * ```
 */
export function difference<T>(array: ArrayLike<T> | null | undefined, ...values: ArrayLike<T>[]): T[];
export function difference(array: any, ...values: any[]): any {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : [];
}

export default difference;
