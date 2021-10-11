import baseFlatten from './.internal/baseFlatten';
import baseUniq from './.internal/baseUniq';
import isArrayLikeObject from './isArrayLikeObject';

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @since 5.20.0
 * @category Array
 * @param arrays The arrays to inspect.
 * @returns Returns the new array of combined values.
 * @see [[difference]], [[unionBy]], [[unionWith]], [[without]], [[xor]], [[xorBy]]
 * @example
 *
 * ```js
 * union([2, 3], [1, 2])
 * // => [2, 3, 1]
 * ```
 */
export function union<T>(...arrays: Array<Array<T>>): Array<T>;
export function union(...arrays: Array<Array<any>>): Array<any>;
export function union(...arrays: Array<Array<any>>): Array<any> {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
}

export default union;
