import baseAssignValue from './.internal/baseAssignValue';
import createAggregator from './.internal/createAggregator';
import { ArrayIteratee, RecordIteratee } from './types';

/**
 * @ignore
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;


/**
 * @ignore
 */
const internalCountBy = createAggregator((result, value, key) => {
  if (hasOwnProperty.call(result, key)) {
    ++result[key];
  } else {
    baseAssignValue(result, key, 1);
  }
});


/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the number of times the key was returned by `iteratee`. The
 * iteratee is invoked with one argument: (value).
 *
 * @since 5.7.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratee The iteratee to transform keys.
 * @returns Returns the composed aggregate object.
 * @example
 *
 * ```js
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'betty', 'active': true },
 *   { 'user': 'fred', 'active': false }
 * ]
 *
 * countBy(users, value => value.active);
 * // => { 'true': 2, 'false': 1 }
 * ```
 */
export function countBy<T>(collection: ArrayLike<T>, iteratee: ArrayIteratee<T>): Record<string, number>;
export function countBy<T>(collection: Record<string, T>, iteratee: RecordIteratee<T>): Record<string, number>;
export function countBy(...args: any[]): any {
  return internalCountBy(...args);
}

export default countBy;
