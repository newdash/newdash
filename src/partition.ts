import createAggregator from './.internal/createAggregator';
import { RecordIteratee, ArrayIteratee, KeyIteratee } from './types';

/**
 * @ignore
 * @private
 */
const internalPartition = createAggregator((result, value, key) => {
  result[key ? 0 : 1].push(value);
}, () => [[], []]);

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @since 5.11.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns the array of grouped elements.
 * @see [[groupBy]], [[keyBy]]
 * @example
 *
 * ```js
 * const users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ]
 *
 * partition(users, ({ active }) => active)
 * // => objects for [['fred'], ['barney', 'pebbles']]
 * ```
 */
export function partition<T>(collection: Record<string, T>, predicate: RecordIteratee<T> | KeyIteratee): Array<Array<T>>
export function partition<T>(collection: Array<T>, predicate: ArrayIteratee<T> | KeyIteratee): Array<Array<T>>
export function partition(...args: any[]): any {
  return internalPartition(...args);
}

export default partition;
