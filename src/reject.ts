import filter from "./filter";
import filterObject from "./filterObject";
import negate from "./negate";
import { Collection, CollectionIteratee } from "./types";

/**
 * The opposite of `filter` this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @since 5.9.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns the new filtered array.
 * @see [[pull]], [[pullAll]], [[pullAllBy]], [[pullAllWith]], [[pullAt]], [[remove]], [[filter]]
 * @example
 *
 * ```js
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * reject(users, ({ active }) => active)
 * // => objects for ['fred']
 * ```
 */

export function reject<T>(collection: Collection<T>, predicate: CollectionIteratee<T>): Array<T>;
export function reject(collection: any, predicate: any): any {
  const func = Array.isArray(collection) ? filter : filterObject;
  return func(collection, negate(predicate));
}

export default reject;
