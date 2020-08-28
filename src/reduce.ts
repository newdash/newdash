import arrayReduce from './.internal/arrayReduce';
import baseEach from './.internal/baseEach';
import baseReduce from './.internal/baseReduce';
import getIteratee from './.internal/getIteratee';
import { AccCollectionIteratee } from './types';

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
 * @since 5.0.0
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
export function reduce<T, R>(collection?: Record<string, T>, iteratee?: AccCollectionIteratee<T, R>, accumulator?: R): R;
export function reduce<T, R>(collection?: ArrayLike<T>, iteratee?: AccCollectionIteratee<T, R>, accumulator?: R): R;
export function reduce(collection?: any, iteratee?: any, accumulator?: any): any {
  const func = Array.isArray(collection) ? arrayReduce : baseReduce;
  const initialValue = arguments.length < 3;
  return func(collection, getIteratee(iteratee, 4), accumulator, initialValue, baseEach);
}

export default reduce;
