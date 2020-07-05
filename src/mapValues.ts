import { PlainObject, CollectionIteratee, KeyIteratee } from './types';
import getIteratee from './.internal/getIteratee';
import baseForOwn from './.internal/baseForOwn';
import baseAssignValue from './.internal/baseAssignValue';

/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @since 5.11.0
 * @category Object
 * @param object The object to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the new mapped object.
 * @see [[mapKeys]]
 * @example
 *
 * ```js
 * const users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * }
 *
 * mapValue(users, ({ age }) => age)
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 * ```
 */
export function mapValues<T>(object: PlainObject<T>, iteratee: KeyIteratee): PlainObject
export function mapValues<T>(object: PlainObject<T>, iteratee: CollectionIteratee<T>): PlainObject
export function mapValues(object: any, iteratee: any): any {
  const result = {};
  iteratee = getIteratee(iteratee, 3);

  baseForOwn(object, (value, key, object) => {
    baseAssignValue(result, key, iteratee(value, key, object));
  });
  return result;
}

export default mapValues;
