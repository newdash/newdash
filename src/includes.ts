import baseIndexOf from "./.internal/baseIndexOf";
import isArrayLike from "./isArrayLike";
import isString from "./isString";
import toInteger from "./toInteger";
import values from "./values";

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @since 5.12.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * ```js
 * includes([1, 2, 3], 1);
 * // => true
 *
 * includes([1, 2, 3], 1, 2);
 * // => false
 *
 * includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * includes('abcd', 'bc');
 * // => true
 * ```
 */
export function includes<T = any>(
  collection: ArrayLike<T> | Record<string, T>,
  value: T,
  fromIndex?: number,
  guard?: any
): boolean
export function includes(collection: any, value: any, fromIndex: number, guard: any): boolean {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  const length = collection.length;
  if (fromIndex < 0) {
    fromIndex = Math.max(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

export default includes;
