import basePullAll from './.internal/basePullAll';
import { Comparator } from './types';

/**
 * This method is like `pullAll` except that it accepts `comparator` which
 * is invoked to compare elements of `array` to `values`. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `differenceWith`, this method mutates `array`.
 *
 * @since 5.11.0
 * @category Array
 * @param array The array to modify.
 * @param values The values to remove.
 * @param comparator The comparator invoked per element.
 * @returns Returns `array`.
 * @see [[pull]], [[pullAll]], [[pullAllBy]], [[pullAt]], [[remove]], [[reject]]
 * @example
 *
 * ```js
 * const array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }]
 *
 * pullAllWith(array, [{ 'x': 3, 'y': 4 }], isEqual)
 * console.log(array)
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 * ```
 */
export function pullAllWith<T>(array: Array<T>, values: Array<T>, comparator: Comparator<T>): Array<T> {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values, undefined, comparator)
    : array;
}

export default pullAllWith;
