// @ts-nocheck
import { Entry } from "./types";

/**
 * The inverse of `entries`is method returns an object composed
 * from key-value `pairs`.
 *
 * @since 5.10.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * ```js
 * fromEntries([['a', 1], ['b', 2]])
 * // => { 'a': 1, 'b': 2 }
 * ```
 */
export function fromEntries<T>(pairs: Array<Entry<T>>): { [key: string]: T };
export function fromEntries(pairs: any): any {
  const result = {};
  if (pairs == null) {
    return result;
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1];
  }
  return result;
}

export default fromEntries;
