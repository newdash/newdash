import baseAssignValue from './.internal/baseAssignValue';
import reduce from './reduce';
import createAggregator from './.internal/createAggregator';


/**
 * @ignore
 */
const internal = createAggregator((result, value, key) => {
  baseAssignValue(result, key, value);
});

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 *
 * @since 5.6.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratee The iteratee to transform keys.
 * @returns Returns the composed aggregate object.
 * @see [[groupBy]],[[partition]]
 * @example
 *
 * ```js
 * const array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ]
 *
 * keyBy(array, ({ code }) => String.fromCharCode(code))
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 * ```
 */
export function keyBy<T>(collection: ArrayLike<T>, iteratee?: (obj: T) => any): Record<string, T>;
export function keyBy(collection: any, iteratee?: any): any {
  return internal(collection, iteratee);
}

export default keyBy;
