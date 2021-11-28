import baseFlatten from "./.internal/baseFlatten";
import map from "./map";


/**
 * @ignore
 */
interface Iteratee<K, V, C> {
  (value?: V, index?: K, collection?: C): any
}


/**
 * This method is like `flatMap` except that it recursively flattens the
 * mapped results up to `depth` times.
 *
 * @since 5.4.0
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @param depth The maximum recursion depth.
 * @returns Returns the new flattened array.
 * @see [[flatMap]],[[flatMapDepth]],[[flatten]],[[flattenDeep]],[[flattenDepth]],[[map]],[[mapKeys]],[[mapValues]]
 * @example
 *
 * ```js
 * function duplicate(n) {
 *   return [[[n, n]]]
 * }
 *
 * flatMapDepth([1, 2], duplicate, 2)
 * // => [[1, 1], [2, 2]]
 * ```
 */
function flatMapDepth<T, R = any>(
  collection: Array<T>,
  iteratee?: Iteratee<number, T, Array<T>>,
  depth?: number
): Array<R>;
function flatMapDepth<T, R = any>(
  collection: Record<string, T>,
  iteratee?: Iteratee<string, T, Record<string, T>>,
  depth?: number
): Array<R>;
function flatMapDepth(collection, iteratee, depth = 1) {
  depth = depth === undefined ? 1 : +depth;
  return baseFlatten(map(collection, iteratee), depth);
}

export default flatMapDepth;
