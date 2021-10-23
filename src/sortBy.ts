import baseFlatten from './.internal/baseFlatten';
import baseOrderBy from './.internal/baseOrderBy';
import baseRest from './.internal/baseRest';
import isIterateeCall from './.internal/isIterateeCall';
import { ArrayAble, ArrayIteratee, KeyIteratee } from './types';

/**
 * @ignore
 * @private
 */
const internalSortBy = baseRest((collection, iteratees) => {
  if (collection == null) {
    return [];
  }
  const length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @since 5.11.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratees The iteratees to sort by.
 * @returns Returns the new sorted array.
 * @example
 *
 * ```js
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 * ```
 */
export function sortBy<T>(collection: ArrayLike<T>, iteratees?: ArrayAble<KeyIteratee | ArrayIteratee<T>>): Array<T>;
export function sortBy(...args: any[]) {
  return internalSortBy(...args);
}

export default sortBy;
