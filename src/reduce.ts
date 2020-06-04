import arrayReduce from './.internal/arrayReduce';
import baseEach from './.internal/baseEach';
import baseReduce from './.internal/baseReduce';
import getIteratee from './.internal/getIteratee';

/**
 * @ignore
 */
interface Iteratee<T, R, K> {
  (accumulator?: R, value?: T, key?: K): R | void
}

/**
 * @ignore
 */
type ArrayIteratee<T = any, R = any> = Iteratee<T, R, number>

/**
 * @ignore
 */
type ObjectIteratee<T = any, R = any> = Iteratee<T, R, string>

/**
 * @ignore
 */
type TypedObject<T> = { [key: string]: T }

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `reduce`, `reduceRight`, and `transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @since 0.0.3
 * @category Collection
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @param accumulator The initial value.
 * @returns  Returns the accumulated value.
 * @see [[reduceRight]],[[transform]]
 * @example
 *
 * ```js
 * reduce([1, 2], (sum, n) => sum + n, 0)
 * // => 3
 *
 * reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
 *   (result[value] || (result[value] = [])).push(key)
 *   return result
 * }, {})
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 * ```
 */
function reduce<T, R>(collection?: Array<T>, iteratee?: ArrayIteratee<T, R>, accumulator?: R): R;
function reduce<T, R>(collection?: TypedObject<T>, iteratee?: ObjectIteratee<T, R>, accumulator?: R): R;
function reduce<T, R>(collection?: any, iteratee?: any, accumulator?: any): any {
  const func = Array.isArray(collection) ? arrayReduce : baseReduce;
  const initAccum = arguments.length < 3;
  return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
}

export { reduce };

export default reduce;
