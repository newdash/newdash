// @ts-nocheck
import baseFindIndex from './.internal/baseFindIndex';
import toInteger from './toInteger';
import getIteratee from './.internal/getIteratee';

/**
 * This method is like `find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @since 5.2.0
 * @category Array
 * @param array The array to inspect.
 * @param predicate The function invoked per iteration.
 * @param fromIndex The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * ```js
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `matches` iteratee shorthand.
 * findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `matchesProperty` iteratee shorthand.
 * findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `property` iteratee shorthand.
 * findIndex(users, 'active');
 * // => 2
 * ```
 */
function findIndex(array, predicate?, fromIndex?: number): number {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  let index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = Math.max(length + index, 0);
  }
  return baseFindIndex(array, getIteratee(predicate, 3), index);
}

export default findIndex;
