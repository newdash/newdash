import { baseFill } from "./.internal/baseFill";
import { isIterateeCall } from "./.internal/isIterateeCall";

/**
   * Fills elements of `array` with `value` from `start` up to, but not
   * including, `end`.
   *
   * **Note:** This method mutates `array`.
   *
   * @static
   * @since 5.10.0
   * @category Array
   * @param array The array to fill.
   * @param value The value to fill `array` with.
   * @param start The start position.
   * @param end The end position.
   * @returns Returns `array`.
   * @example
   *
   * ```js
   * var array = [1, 2, 3];
   *
   * fill(array, 'a');
   * console.log(array);
   * // => ['a', 'a', 'a']
   *
   * fill(Array(3), 2);
   * // => [2, 2, 2]
   *
   * fill([4, 6, 8, 10], '*', 1, 3);
   * // => [4, '*', '*', 10]
   * ```
   */
export function fill<T>(array: Array<any>, value?: T): Array<T>;
export function fill(array: Array<any>, value?: any, start?: number, end?: number): Array<any>;
export function fill(array: Array<any>, value?: any, start: number = 0, end: number = array?.length): Array<any> {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
    start = 0;
    end = length;
  }
  return baseFill(array, value, start, end);
}
