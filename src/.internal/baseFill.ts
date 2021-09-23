import { toInteger } from "../toInteger";
import { toLength } from "../toLength";

/**
 * The base implementation of `_.fill` without an iteratee call guard.
 *
 * @ignore
 * @internal
 * @private
 * @param array The array to fill.
 * @param value The value to fill `array` with.
 * @param start The start position.
 * @param end The end position.
 * @returns  Returns `array`.
 */
export function baseFill<T = any>(array: Array<any>, value: T, start: number = 0, end: number = array?.length): Array<T> {
  var length = array.length;

  start = toInteger(start);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : toInteger(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}
