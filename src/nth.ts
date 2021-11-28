import isIndex from "./.internal/isIndex";
import toInteger from "./toInteger";

/**
 * @ignore
 * @private
 * @internal
 * @param array
 * @param n
 */
function baseNth(array: any, n: any): any {
  const length = array.length;
  if (!length) {
    return;
  }
  n += n < 0 ? length : 0;
  return isIndex(n, length) ? array[n] : undefined;
}

/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth
 * element from the end is returned.
 *
 * @since 5.7.0
 * @category Array
 * @param array The array to query.
 * @param n The index of the element to return.
 * @returns Returns the nth element of `array`.
 * @example
 *
 * ```js
 * const array = ['a', 'b', 'c', 'd']
 *
 * nth(array, 1)
 * // => 'b'
 *
 * nth(array, -2)
 * // => 'c'
 * ```
 */
export function nth<T>(array: Array<T>, n = 0): T {
  return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
}

export default nth;
