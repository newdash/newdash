import baseFindIndex from "./.internal/baseFindIndex";
import getIteratee from "./.internal/getIteratee";
import toInteger from "./toInteger";

/**
 * This method is like `findIndex` except that it iterates over elements
 * of `collection` from right to left.
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
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * findLastIndex(users, function(o) { return o.user == 'pebbles'; });
 * // => 2
 *
 * // The `matches` iteratee shorthand.
 * findLastIndex(users, { 'user': 'barney', 'active': true });
 * // => 0
 *
 * // The `matchesProperty` iteratee shorthand.
 * findLastIndex(users, ['active', false]);
 * // => 2
 *
 * // The `property` iteratee shorthand.
 * findLastIndex(users, 'active');
 * // => 0
 *
 * ```
 */
export function findLastIndex(array, predicate?, fromIndex?: number): number {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  let index = length - 1;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0
      ? Math.max(length + index, 0)
      : Math.min(index, length - 1);
  }
  return baseFindIndex(array, getIteratee(predicate, 3), index, true);
}

export default findLastIndex;
