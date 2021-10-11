import baseFindKey from './.internal/baseFindKey';
import baseForOwnRight from './.internal/baseForOwnRight';
import getIteratee from './.internal/getIteratee';
import { Predicate } from './types';

/**
 * This method is like `findKey` except that it iterates over elements of
 * a collection in the opposite order.
 *
 * @since 5.2.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @example
 *
 * ```js
 * var users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * findLastKey(users, function(o) { return o.age < 40; });
 * // => returns 'pebbles' assuming `findKey` returns 'barney'
 *
 * // The `matches` iteratee shorthand.
 * findLastKey(users, { 'age': 36, 'active': true });
 * // => 'barney'
 *
 * // The `matchesProperty` iteratee shorthand.
 * findLastKey(users, ['active', false]);
 * // => 'fred'
 *
 * // The `property` iteratee shorthand.
 * findLastKey(users, 'active');
 * // => 'pebbles'
 * ```
 */
export function findLastKey<V>(object: Record<string, V>, predicate?: Predicate<V>): string
export function findLastKey(object: any, predicate?: Array<any>): string
export function findLastKey(object: any, predicate?: string): string
export function findLastKey(object: any, predicate?: any): string {
  return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
}

export default findLastKey;
