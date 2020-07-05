import basePullAt from './.internal/basePullAt';
import { CollectionIteratee } from './types';
import getIteratee from './.internal/getIteratee';

/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `filter`, this method mutates `array`. Use `pull`
 * to pull elements from an array by value.
 *
 * @since 5.11.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @see [[pull]], [[pullAll]], [[pullAllBy]], [[pullAllWith]], [[pullAt]], [[reject]], [[filter]]
 * @example
 *
 * ```js
 * const array = [1, 2, 3, 4]
 * const evens = remove(array, n => n % 2 == 0)
 *
 * console.log(array)
 * // => [1, 3]
 *
 * console.log(evens)
 * // => [2, 4]
 * ```
 */
export function remove<T>(array: ArrayLike<T>, predicate: CollectionIteratee<T, boolean>): Array<T>
export function remove(array: any, predicate: any): any {
  const result = [];
  if (!(array && array.length)) {
    return result;
  }
  let index = -1;
  const indexes = [];
  const length = array.length;

  predicate = getIteratee(predicate, 3);
  while (++index < length) {
    const value = array[index];
    if (predicate(value, index, array)) {
      result.push(value);
      indexes.push(index);
    }
  }
  basePullAt(array, indexes);
  return result;
}

export default remove;
