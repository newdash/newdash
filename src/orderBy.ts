import baseOrderBy from './.internal/baseOrderBy';
import { Collection, CollectionIteratee, KeyIteratee, ArrayAble } from './types';
import isArray from './isArray';

/**
 * @ignore
 */
type FunctionOrder<T = any> = (v1: T, v2: T) => any
/**
 * @ignore
 */
type StringOrder = 'asc' | 'desc'
/**
 * @ignore
 */
type Order<T = any> = FunctionOrder<T> | StringOrder


/**
 * This method is like `sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 * You may also specify a compare function for an order.
 *
 * @since 5.10.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratees The iteratees to sort by.
 * @param orders The sort orders of `iteratees`.
 * @returns Array Returns the new sorted array.
 * @see [[reverse]]
 * @example
 *
 * ```js
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ]
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * orderBy(users, ['user', 'age'], ['asc', 'desc'])
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * // Sort by `user` then by `age` using custom compare functions for each
 * orderBy(users, ['user', 'age'], [
 *   (a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' }),
 *   (a, b) => a - b,
 * ])
 * ```
 *
 */
export function orderBy<T, T2>(collection: Collection<T>, iteratees: ArrayAble<CollectionIteratee<T, T2> | KeyIteratee>, orders: ArrayAble<Order<T2>>, guard?: any): Array<T>;
export function orderBy(collection: any, iteratees: any, orders: any, guard: any): any {
  if (collection == null) {
    return [];
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
}

export default orderBy;
