import isArray from './isArray';
import getIteratee from './.internal/getIteratee';
import arrayFilter from './.internal/arrayFilter';
import baseFilter from './.internal/baseFilter';

type Predicate<T> = (value?: T) => boolean

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @since 0.0.3
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * ```js
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 * ```
 */
function filter<T>(collection: Array<T>, predicate: Predicate<T>): Array<T>;
function filter<T>(collection: Array<T>, predicate: any): Array<T>;
function filter(collection: any, predicate: any): any {
  const func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, getIteratee(predicate, 3));
}

export default filter;
