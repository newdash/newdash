import baseFlatten from './.internal/baseFlatten';
import baseUniq from './.internal/baseUniq';
import isArrayLikeObject from './isArrayLikeObject';
import last from './last';
import getIteratee from './.internal/getIteratee';

/**
 * This method is like `union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which uniqueness is computed. Result values are chosen from the first
 * array in which the value occurs. The iteratee is invoked with one argument:
 * (value).
 *
 * @since 5.11.0
 * @category Array
 * @param arrays The arrays to inspect.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the new array of combined values.
 * @see [[difference]], [[union]], [[unionWith]], [[without]], [[xor]], [[xorBy]]
 * @example
 *
 * ```js
 * unionBy([2.1], [1.2, 2.3], Math.floor)
 * // => [2.1, 1.2]
 * ```
 */
export function unionBy<T>(...arrays: any[]): Array<T> {
  let iteratee = last(arrays);
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
}

export default unionBy;
