import findIndex from './findIndex';
import createFind from './.internal/createFind';

/**
 * @ignore
 */
const internalFind = createFind(findIndex);

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @since 5.2.0
 * @category Collection
 * @param collection The collection to inspect.
 * @param predicate function invoked per iteration.
 * @param fromIndex The index to search from.
 * @returns Returns the matched element, else `undefined`.
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
function find<T>(collection: ArrayLike<T>, predicate?: string, fromIndex?): T | undefined;
function find<T>(collection: ArrayLike<T>, predicate?: (item: T) => boolean, fromIndex?): T | undefined;
function find<T>(collection: ArrayLike<T>, predicate?: Partial<T>, fromIndex?): T | undefined;
function find<T>(collection: ArrayLike<T>, predicate?, fromIndex?): T | undefined;
function find(collection, predicate?, fromIndex?) {
  return internalFind(collection, predicate, fromIndex);
}

export { find };

export default find;
