import baseSum from "./.internal/baseSum";
import getIteratee from "./.internal/getIteratee";
import { ArrayIteratee } from "./types";

/**
 * Used as references for various `Number` constants.
 * @ignore
 */
const NAN = Number.NaN;

/**
 * This method is like `mean` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be averaged.
 * The iteratee is invoked with one argument: (value).
 *
 * @since 5.11.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {number} Returns the mean.
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * meanBy(objects, ({ n }) => n)
 * // => 5
 */
export function meanBy<T = any>(array: Array<T>, iteratee: ArrayIteratee<T, number>): number {
  const length = array == null ? 0 : array.length;
  return length ? (baseSum(array, getIteratee(iteratee, 2)) / length) : NAN;
}

export default meanBy;
