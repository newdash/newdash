import baseIntersection from './.internal/baseIntersection';
import castArrayLikeObject from './.internal/castArrayLikeObject';
import arrayMap from './.internal/arrayMap';

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @since 5.11.0
 * @category Array
 * @param arrays The arrays to inspect.
 * @returns Returns the new array of intersecting values.
 * @example
 *
 * ```js
 * intersection([2, 1], [2, 3])
 * // => [2]
 * ```
 */
export function intersection<T = any>(...arrays: Array<Array<T>>): Array<T> {
  const mapped = arrayMap(arrays, castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : [];
}

export default intersection;
