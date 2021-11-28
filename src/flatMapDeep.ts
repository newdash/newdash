import baseFlatten from "./.internal/baseFlatten";
import map from "./map";
/**
 * @ignore
 */
interface Iteratee<K, V, C> {
  (value?: V, index?: K, collection?: C): any
}

/** Used as references for various `Number` constants. */
const INFINITY = Infinity;

/**
 * This method is like `flatMap` except that it recursively flattens the
 * mapped results.
 *
 * @since 5.4.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @see [[flatMap]],[[flatMapDepth]],[[flatten]],[[flattenDeep]],[[flattenDepth]],[[map]],[[mapKeys]],[[mapValues]]
 * @example
 *
 * ```js
 * function duplicate(n) {
 *   return [[[n, n]]]
 * }
 *
 * flatMapDeep([1, 2], duplicate)
 * // => [1, 1, 2, 2]
 * ```
 */
export function flatMapDeep<T, R = any>(collection: Array<T>, iteratee?: Iteratee<number, T, Array<T>>): Array<R>;
export function flatMapDeep<T, R = any>(
  collection: Record<string, T>,
  iteratee?: Iteratee<string, T, Record<string, T>>
): Array<R>;
export function flatMapDeep(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), INFINITY);
}

export default flatMapDeep;
