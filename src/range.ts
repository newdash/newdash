import createRange from "./.internal/createRange";

/**
 * @ignore
 */
const internal = createRange();

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start`, and `start` is then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @since 5.7.0
 * @category Util
 * @param  start The start of the range.
 * @param  end The end of the range.
 * @param  step The value to increment or decrement by.
 * @returns Returns the range of numbers.
 * @see [[inRange]],[[rangeRight]]
 * @example
 *
 * ```js
 * range(4)
 * // => [0, 1, 2, 3]
 *
 * range(-4)
 * // => [0, -1, -2, -3]
 *
 * range(1, 5)
 * // => [1, 2, 3, 4]
 *
 * range(0, 20, 5)
 * // => [0, 5, 10, 15]
 *
 * range(0, -4, -1)
 * // => [0, -1, -2, -3]
 *
 * range(1, 4, 0)
 * // => [1, 1, 1]
 *
 * range(0)
 * // => []
 * ```
 */
export function range(start: number, end?: number, step?: number): Array<number>
export function range(...args: any[]) {
  return internal(...args);
}

export default range;
