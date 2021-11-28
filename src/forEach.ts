import arrayEach from "./.internal/arrayEach";
import baseEach from "./.internal/baseEach";
import { ArrayIteratee, PlainObject, RecordIteratee } from "./types";

/**
 *
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `forIn`
 * or `forOwn` for object iteration.
 *
 * @since 5.0.0
 * @alias each
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns `collection`.
 * @see [[forEachRight]],[[forIn]],[[forInRight]],[[forOwn]],[[forOwnRight]]
 * @example
 *
 *
 * ```js
 * forEach([1, 2], value => console.log(value))
 * // => Logs `1` then `2`.
 *
 * forEach({ 'a': 1, 'b': 2 }, (value, key) => console.log(key))
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 * ```
 *
 */
export function forEach<T>(collection?: ArrayLike<T>, iteratee?: ArrayIteratee<T, void>): void;
export function forEach<T>(collection?: PlainObject<T>, iteratee?: RecordIteratee<T, void>): void;
export function forEach(collection?: any, iteratee?: any): any {
  const func = Array.isArray(collection) ? arrayEach : baseEach;
  return func(collection, iteratee);
}

export default forEach;
