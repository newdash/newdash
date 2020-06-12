import arrayReduceRight from './.internal/arrayReduceRight';
import baseEachRight from './.internal/baseEachRight';
import baseReduce from './.internal/baseReduce';
import getIteratee from './.internal/getIteratee';
/**
 * @ignore
 */
interface Iteratee<T, R, K> {
  (accumulator?: R, value?: T, key?: K): R | void
}

/**
 * This method is like `reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see reduce
 * @example
 *
 * const array = [[0, 1], [2, 3], [4, 5]]
 *
 * reduceRight(array, (flattened, other) => flattened.concat(other), [])
 * // => [4, 5, 2, 3, 0, 1]
 */
export function reduceRight<T, R>(collection?: ArrayLike<T>, iteratee?: Iteratee<T, R, number>, accumulator?: R): R;
export function reduceRight<T, R>(collection?: Record<string, T>, iteratee?: Iteratee<T, R, string>, accumulator?: R): R;
export function reduceRight(collection?: any, iteratee?: any, accumulator?: any): any {
  const func = Array.isArray(collection) ? arrayReduceRight : baseReduce;
  const initAccum = arguments.length < 3;
  return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
}

export default reduceRight;
