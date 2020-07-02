import baseAssignValue from './.internal/baseAssignValue';
import createAggregator from './.internal/createAggregator';
import { Collection, CollectionIteratee, KeyIteratee } from './types';

/**
 * Used to check objects for own properties.
 * @ignore
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @ignore
 */
const internalGroupBy = createAggregator((result: any, value: any, key: any) => {
  if (hasOwnProperty.call(result, key)) {
    result[key].push(value);
  } else {
    baseAssignValue(result, key, [value]);
  }
});


/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @since 5.5.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param identity The iteratee to transform keys.
 * @returns Returns the composed aggregate object.
 * @example
 *
 * ```js
 * groupBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * // The `property` iteratee shorthand.
 * groupBy(['one', 'two', 'three'], 'length');
 * // => { '3': ['one', 'two'], '5': ['three'] }
 * ```
 */
export function groupBy<T, K>(result: Collection<T>): Record<string, Array<T>>;
export function groupBy<T, K>(result: Collection<T>, iteratee: KeyIteratee): Record<string, Array<T>>;
export function groupBy<T, K>(result: Collection<T>, iteratee: CollectionIteratee<T, any>): Record<string, Array<T>>;
export function groupBy(result: any, iteratee?: any): any {
  return internalGroupBy(result, iteratee);
}

export default groupBy;
