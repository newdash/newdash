import findIndex from './findIndex';
import createFind from './.internal/createFind';

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @since 5.2.0
 * @category Collection
 * @param collection The collection to inspect.
 * @param predicateThe function invoked per iteration.
 * @param fromIndex The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * ```js
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `matches` iteratee shorthand.
 * find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `matchesProperty` iteratee shorthand.
 * find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `property` iteratee shorthand.
 * find(users, 'active');
 * // => object for 'barney'
 * ```
 */
const find = createFind(findIndex);

export default find;
