/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 5.0.0
 * @category Array
 * @param array The array to compact.
 * @returns Returns the new array of filtered values.
 * @example
 *
 * ```js
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 * ```
 */
export function compact(array: Array<any>): Array<any> {
  let resIndex = 0;
  const result = [];

  if (array === null || array === undefined) {
    return result;
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

export default compact;
