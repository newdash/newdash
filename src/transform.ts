import arrayEach from './.internal/arrayEach';
import baseForOwn from './.internal/baseForOwn';
import isBuffer from './isBuffer';
import isObject from './isObject';
import isTypedArray from './isTypedArray';
import isArray from './isArray';
import getIteratee from './.internal/getIteratee';
import isFunction from './isFunction';
import baseCreate from './.internal/baseCreate';
import overArg from './.internal/overArg';
import { AccCollectionIteratee, Collection } from './types';

/**
 * @ignore
 */
const getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * An alternative to `reduce` this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @since 5.11.0
 * @category Object
 * @param object The object to iterate over.
 * @param iteratee The function invoked per iteration.
 * @param accumulator The custom accumulator value.
 * @returns Returns the accumulated value.
 * @see [[reduce]], [[reduceRight]]
 * @example
 *
 * ```js
 * transform([2, 3, 4], (result, n) => {
 *   result.push(n *= n)
 *   return n % 2 == 0
 * }, [])
 * // => [4, 9]
 *
 * transform({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
 *   (result[value] || (result[value] = [])).push(key)
 * }, {})
 * // => { '1': ['a', 'c'], '2': ['b'] }
 * ```
 */
export function transform<T>(object: Collection<T>, iteratee: AccCollectionIteratee<T>, accumulator: any): any;
export function transform(object: any, iteratee: any, accumulator: any): any {
  const isArr = isArray(object),
    isArrLike = isArr || isBuffer(object) || isTypedArray(object);

  iteratee = getIteratee(iteratee, 4);
  if (accumulator == null) {
    const Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = isArr ? new Ctor : [];
    }
    else if (isObject(object)) {
      accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
    }
    else {
      accumulator = {};
    }
  }
  (isArrLike ? arrayEach : baseForOwn)(object, (value, index, object) => iteratee(accumulator, value, index, object));
  return accumulator;
}

export default transform;
