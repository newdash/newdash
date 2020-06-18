import baseAssignValue from './.internal/baseAssignValue';
import reduce from './reduce';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the number of times the key was returned by `iteratee`. The
 * iteratee is invoked with one argument: (value).
 *
 * @since 5.7.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
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
export function countBy<T>(collection: ArrayLike<T>, iteratee: any): Record<string, number>;
export function countBy(collection: any, iteratee: any): Record<string, number>;
export function countBy(collection: any, iteratee: any): any {
  return reduce(collection, (result, value, key) => {
    key = iteratee(value);
    if (hasOwnProperty.call(result, key)) {
      ++result[key];
    } else {
      baseAssignValue(result, key as any, 1);
    }
    return result;
  }, {});
}

export default countBy;
