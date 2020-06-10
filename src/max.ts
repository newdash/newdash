import identity from './.internal/identity';
import baseExtremum from './.internal/baseExtremum';


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
  return (array && array.length)
    ? baseExtremum(array, identity, (v1: any, v2: any) => v1 > v2)
    : undefined;
}


export default max;
