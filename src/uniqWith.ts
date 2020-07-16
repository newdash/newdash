import baseUniq from './.internal/baseUniq';
import { Comparator } from './types';

/**
 * This method is like `uniq` except that it accepts `comparator` which
 * is invoked to compare elements of `array`. The order of result values is
 * determined by the order they occur in the array. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @since 5.12.0
 * @category Array
 * @param array The array to inspect.
 * @param comparator The comparator invoked per element.
 * @returns Returns the new duplicate free array.
 * @see [[uniq]], [[uniqBy]]
 * @example
 *
 * ```js
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * uniqWith(objects, isEqual)
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * ```
 */
export function uniqWith<T = any>(array: Array<T>, comparator: Comparator<T>): Array<T>
export function uniqWith(array: any, comparator: any): any {
  comparator = typeof comparator == 'function' ? comparator : undefined;
  return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
}

export default uniqWith;
