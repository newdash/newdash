import { PlainObject, CollectionIteratee } from './types';
import baseForOwnRight from './.internal/baseForOwnRight';
import getIteratee from './.internal/getIteratee';

/**
 * This method is like `forOwn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @since 5.11.0
 * @category Object
 * @param object The object to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns `object`.
 * @see [[forEach]], [[forEachRight]], [[forIn]], [[forInRight]], [[forOwn]]
 * @example
 *
 * ```js
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * forOwnRight(new Foo, function(value, key) {
 *   console.log(key)
 * })
 * // => Logs 'b' then 'a' assuming `forOwn` logs 'a' then 'b'.
 * ```
 */
export function forOwnRight<T>(object: PlainObject<T>, iteratee: CollectionIteratee<T, void>): void
export function forOwnRight(object: any, iteratee: any): void {
  return object && baseForOwnRight(object, getIteratee(iteratee, 3));
}

export default forOwnRight;
