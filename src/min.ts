import minBy from './minBy';
import identity from './.internal/identity';

/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @since 5.8.0
 * @category Math
 * @param array The array to iterate over.
 * @returns Returns the minimum value.
 * @example
 *
 * ```js
 * min([4, 2, 8, 6]);
 * // => 2
 *
 * min([]);
 * // => undefined
 * ```
 */
export function min<T>(array: ArrayLike<T>): T;
export function min(array: any): any;
export function min(array: any): any {
  return minBy(array, identity);
}

export default min;
