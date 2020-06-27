import identity from './.internal/identity';
import maxBy from './maxBy';


/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @since 5.6.0
 * @category Math
 * @param array The array to iterate over.
 * @returns Returns the maximum value.
 * @example
 *
 * ```js
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 * ```
 */
export function max<T>(array: ArrayLike<T>): T;
export function max(array: any): any {
  return maxBy(array, identity);
}


export default max;
