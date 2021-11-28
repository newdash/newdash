import baseFlatten from "./.internal/baseFlatten";
import baseUniq from "./.internal/baseUniq";
import isArrayLikeObject from "./isArrayLikeObject";
import last from "./last";

/**
 * This method is like `union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. Result values are chosen from
 * the first array in which the value occurs. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @since 5.13.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of combined values.
 * @see [[difference]], [[union]], [[unionBy]], [[without]], [[xor]], [[xorBy]]
 * @example
 *
 * ```js
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * unionWith(objects, others, isEqual)
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 * ```
 */
export function unionWith(...arrays) {
  let comparator = last(arrays);
  comparator = typeof comparator === "function" ? comparator : undefined;
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
}

export default unionWith;
