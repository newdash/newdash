import baseFlatten from './.internal/baseFlatten';
import map from './map';

/**
 * @ignore
 */
interface Iteratee<K, V, C> {
  (value?: V, index?: K, collection?: C): any
}

/**
 * Creates a flattened array of values by running each element in `collection`
 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @since 5.4.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the new flattened array.
 * @see [[flatMapDeep]],[[flatMapDepth]],[[flatten]],[[flattenDeep]],[[flattenDepth]],[[map]],[[mapKeys]],[[mapValues]]
 * @example
 *
 * ```js
 * function duplicate(n) {
 *   return [n, n]
 * }
 *
 * flatMap([1, 2], duplicate)
 * // => [1, 1, 2, 2]
 * ```
 */
export function flatMap<T, R = any>(collection: Array<T>, iteratee?: Iteratee<number, T, Array<T>>): Array<R>;
export function flatMap<T, R = any>(collection: Record<string, T>, iteratee?: Iteratee<string, T, Record<string, T>>): Array<R>;
export function flatMap(collection, iteratee?) {
  return baseFlatten(map(collection, iteratee), 1);
}

export default flatMap;
