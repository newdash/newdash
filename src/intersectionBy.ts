// @ts-nocheck
import arrayMap from './.internal/arrayMap';
import baseIntersection from './.internal/baseIntersection';
import castArrayLikeObject from './.internal/castArrayLikeObject';
import getIteratee from './.internal/getIteratee';
import last from './last';

/**
 * This method is like `intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @since 5.11.0
 * @category Array
 * @param arrays The arrays to inspect.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the new array of intersecting values.
 * @example
 *
 * ```js
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [2.1]
 * ```
 */
export function intersectionBy<T>(...arrays: Array<any>): Array<T> {
  let iteratee = last(arrays);
  const mapped = arrayMap(arrays, castArrayLikeObject);

  if (iteratee === last(mapped)) {
    iteratee = undefined;
  } else {
    mapped.pop();
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, getIteratee(iteratee, 2))
    : [];
}

export default intersectionBy;
