import baseXor from './.internal/baseXor';
import isArrayLikeObject from './isArrayLikeObject';
import getIteratee from './.internal/getIteratee';

/**
 * This method is like `xor` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which they're compared. The order of result values is determined
 * by the order they occur in the arrays. The iteratee is invoked with one
 * argument: (value).
 *
 * @since 5.9.0
 * @category Array
 * @param arrays The arrays to inspect.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the new array of filtered values.
 * @see [[difference]],[[union]],[[unionBy]],[[unionWith]],[[without]],[[xor]],[[xorWith]]
 * @example
 *
 * ```js
 * xorBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [1.2, 3.4]
 * ```
 */
function xorBy<T>(iteratee: Function, ...arrays: Array<Array<T>>): Array<T> {
  return baseXor(arrays.filter(isArrayLikeObject), getIteratee(iteratee, 2));
}

export default xorBy;
