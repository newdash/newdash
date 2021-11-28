import baseFindIndex from "./.internal/baseFindIndex";
import baseIsNaN from "./.internal/baseIsNaN";
import strictLastIndexOf from "./.internal/strictLastIndexOf";
import toInteger from "./toInteger";

/**
 * This method is like `indexOf` except that it iterates over elements of
 * `array` from right to left.
 *
 * @since 5.6.0
 * @category Array
 * @param array The array to inspect.
 * @param value The value to search for.
 * @param fromIndex The index to search from.
 * @returns Returns the index of the matched value, else `-1`.
 * @example
 *
 * ```js
 * lastIndexOf([1, 2, 1, 2], 2)
 * // => 3
 *
 * // Search from the `fromIndex`.
 * lastIndexOf([1, 2, 1, 2], 2, 2)
 * // => 1
 * ```
 */
export function lastIndexOf<T>(array: ArrayLike<T>, value: T, fromIndex: number): number;
export function lastIndexOf(array: any, value: any, fromIndex: number): number {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  let index = length;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1);
  }
  return value === value
    ? strictLastIndexOf(array, value, index)
    : baseFindIndex(array, baseIsNaN, index, true);
}

export default lastIndexOf;
