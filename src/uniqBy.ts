import baseUniq from './.internal/baseUniq';
import { ArrayIteratee, KeyIteratee } from './types';
import getIteratee from './.internal/getIteratee';

/**
 * This method is like `uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @since 5.12.0
 * @category Array
 * @param array The array to inspect.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the new duplicate free array.
 * @see [[uniq]], [[uniqWith]]
 * @example
 *
 * ```js
 * uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `property` iteratee shorthand.
 * uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 * ```
 */
export function uniqBy<T = any>(array: Array<T>, iteratee: KeyIteratee): Array<T>;
export function uniqBy<T = any>(array: Array<T>, iteratee: ArrayIteratee<T>): Array<T>;
export function uniqBy(array: any, iteratee: any): any {
  return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
}

export default uniqBy;
