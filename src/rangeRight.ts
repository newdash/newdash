import createRange from './.internal/createRange';

/**
 * @ignore
 */
const internal = createRange(true);

/**
 * This method is like `range` except that it populates values in
 * descending order.
 *
 * @since 5.7.0
 * @category Util
 * @param  start The start of the range.
 * @param  end The end of the range.
 * @param  step The value to increment or decrement by.
 * @returns Returns the range of numbers.
 * @see inRange, range
 * @example
 *
 * rangeRight(4)
 * // => [3, 2, 1, 0]
 *
 * rangeRight(-4)
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 5)
 * // => [4, 3, 2, 1]
 *
 * rangeRight(0, 20, 5)
 * // => [15, 10, 5, 0]
 *
 * rangeRight(0, -4, -1)
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 4, 0)
 * // => [1, 1, 1]
 *
 * rangeRight(0)
 * // => []
 */
export function rangeRight(start: number, end: number, step: number): Array<number>
export function rangeRight(...args: any[]) {
  return internal(...args);
}

export default rangeRight;
