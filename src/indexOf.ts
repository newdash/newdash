import baseIndexOf from './.internal/baseIndexOf';
import toInteger from './toInteger';

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @since 5.5.1
 * @category Array
 * @param array The array to inspect.
 * @param value The value to search for.
 * @param fromIndex The index to search from.
 * @returns Returns the index of the matched value, else `-1`.
 * @example
 *
 * ```js
 * indexOf([1, 2, 1, 2], 2)
 * // => 1
 *
 * // Search from the `fromIndex`.
 * indexOf([1, 2, 1, 2], 2, 2)
 * // => 3
 * ```
 */
export function indexOf<T>(array: ArrayLike<T>, value: T, fromIndex?: number): number;
export function indexOf(array: any, value: any, fromIndex?: any): number {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  let index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = Math.max(length + index, 0);
  }
  return baseIndexOf(array, value, index);
}

export default indexOf;
