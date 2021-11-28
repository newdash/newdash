import copyArray from "./.internal/copyArray";
import shuffleSelf from "./.internal/shuffleSelf";
import baseClamp from "./.internal/baseClamp";
import toInteger from "./toInteger";
import isArray from "./isArray";
import { Collection } from "./types";
import values from "./values";
import isIterateeCall from "./.internal/isIterateeCall";


/**
 * @ignore
 * @param array
 * @param n
 */
function arraySampleSize(array, n) {
  return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
}

/**
 * @ignore
 * @param collection
 * @param n
 */
function baseSampleSize(collection, n) {
  const array = values(collection);
  return shuffleSelf(array, baseClamp(n, 0, array.length));
}

/**
 * Gets `n` random elements at unique keys from `array` up to the
 * size of `array`.
 *
 * @since 5.11.0
 * @category Array
 * @param collection The array to sample.
 * @param n The number of elements to sample.
 * @returns Returns the random elements.
 * @example
 *
 * ```js
 * sampleSize([1, 2, 3], 2)
 * // => [3, 1]
 *
 * sampleSize([1, 2, 3], 4)
 * // => [2, 3, 1]
 * ```
 */
export function sampleSize<T>(collection: Collection<T>, n = 1, guard?: any): Array<T> {
  if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  const func = isArray(collection) ? arraySampleSize : baseSampleSize;
  return func(collection, n);
}

export default sampleSize;
