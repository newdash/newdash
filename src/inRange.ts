import baseInRange from './.internal/baseInRange';
import toFinite from './toFinite';
import toNumber from './toNumber';

/**
 * Checks if `number` is between `start` and up to, but not including, `end`. If
 * `end` is not specified, it's set to `start` with `start` then set to `0`.
 * If `start` is greater than `end` the params are swapped to support
 * negative ranges.
 *
 * @since 5.7.0
 * @category Number
 * @param  number The number to check.
 * @param  start The start of the range.
 * @param  end The end of the range.
 * @returns Returns `true` if `number` is in the range, else `false`.
 * @see [[range]],[[rangeRight]]
 * @example
 *
 * ```js
 * inRange(3, 2, 4)
 * // => true
 *
 * inRange(4, 8)
 * // => true
 *
 * inRange(4, 2)
 * // => false
 *
 * inRange(2, 2)
 * // => false
 *
 * inRange(1.2, 2)
 * // => true
 *
 * inRange(5.2, 4)
 * // => false
 *
 * inRange(-3, -2, -6)
 * // => true
 * ```
 */
export function inRange(number: number, start?: number, end?: number): boolean {
  start = toFinite(start);
  if (end === undefined) {
    end = start;
    start = 0;
  } else {
    end = toFinite(end);
  }
  number = toNumber(number);
  return baseInRange(number, start, end);
}

export default inRange;
