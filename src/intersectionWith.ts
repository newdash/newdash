// @ts-nocheck
import arrayMap from "./.internal/arrayMap";
import baseIntersection from "./.internal/baseIntersection";
import castArrayLikeObject from "./.internal/castArrayLikeObject";
import last from "./last";

/**
 * This method is like `intersection` except that it accepts `comparator`
 * which is invoked to compare elements of `arrays`. The order and references
 * of result values are determined by the first array. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * @since 5.11.0
 * @category Array
 * @param arrays The arrays to inspect.
 * @param comparator The comparator invoked per element.
 * @returns Returns the new array of intersecting values.
 * @example
 *
 * ```js
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * intersectionWith(objects, others, isEqual)
 * // => [{ 'x': 1, 'y': 2 }]
 * ```
 */
export function intersectionWith<T>(...arrays: Array<any>): Array<T> {
  let comparator = last(arrays);
  const mapped = arrayMap(arrays, castArrayLikeObject);

  comparator = typeof comparator === "function" ? comparator : undefined;
  if (comparator) {
    mapped.pop();
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, undefined, comparator)
    : [];
}

export default intersectionWith;
