import isIterateeCall from './.internal/isIterateeCall';
import toInteger from './toInteger';

/**
 * @ignore
 * @private
 * @param array
 * @param start
 * @param end
 */
function baseSlice(array: any, start: any, end: any) {
  let index = -1,
    length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  const result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 5.6.0
 * @category Array
 * @param array The array to slice.
 * @param start The start position. A negative index will be treated as an offset from the end.
 * @param end The end position. A negative index will be treated as an offset from the end.
 * @returns Returns the slice of `array`.
 * @example
 *
 * ```js
 * var array = [1, 2, 3, 4]
 *
 * slice(array, 2)
 * // => [3, 4]
 * ```
 */
export function slice<T>(array: ArrayLike<T>, start?: number, end?: number): Array<T>
export function slice(array: any, start: any, end: any) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
    start = 0;
    end = length;
  }
  else {
    start = start == null ? 0 : toInteger(start);
    end = end === undefined ? length : toInteger(end);
  }
  return baseSlice(array, start, end);
}

export default slice;
