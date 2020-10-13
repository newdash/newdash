import { CollectionIteratee, PlainObject } from './types';

/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @since 5.11.0
 * @category Object
 * @param object The object to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns `object`.
 * @see forEach, forEachRight, forIn, forInRight, forOwnRight
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
 * forOwn(new Foo, function(value, key) {
 *   console.log(key)
 * })
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 * ```
 */
export function forOwn<T>(object: PlainObject<T>, iteratee: CollectionIteratee<T, void>): void
export function forOwn(object: any, iteratee: any): void {
  object = Object(object);
  Object.keys(object).forEach((key) => iteratee(object[key], key, object));
}

export default forOwn;
