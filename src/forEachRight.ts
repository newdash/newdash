import arrayEachRight from "./.internal/arrayEachRight";
import baseEachRight from "./.internal/baseEachRight";
import { ArrayIteratee, PlainObject, RecordIteratee } from "./types";

/**
 * This method is like `forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 5.13.0
 * @alias eachRight
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns `collection`.
 * @see [[forEach]], [[forIn]], [[forInRight]], [[forOwn]], [[forOwnRight]]
 * @example
 *
 * ```js
 * forEachRight([1, 2], value => console.log(value))
 * // => Logs `2` then `1`.
 * ```
 */
export function forEachRight<T>(collection?: ArrayLike<T>, iteratee?: ArrayIteratee<T, void>): void;
export function forEachRight<T>(collection?: PlainObject<T>, iteratee?: RecordIteratee<T, void>): void;
export function forEachRight(collection: any, iteratee: any): any {
  const func = Array.isArray(collection) ? arrayEachRight : baseEachRight;
  return func(collection, iteratee);
}

export default forEachRight;
