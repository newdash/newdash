import baseFlatten from "./.internal/baseFlatten";
import copyArray from "./.internal/copyArray";
import arrayPush from "./.internal/arrayPush";
import isArray from "./isArray";

/**
 * Creates a new array concatenating `array` with any additional arrays
 * and/or values.
 *
 * @since 5.0.0
 * @category Array
 * @returns Returns the new concatenated array.
 * @example
 *
 * ```js
 * var array = [1];
 * var other = concat(array, 2, [3], [[4]]);
 *
 * console.log(other);
 * // => [1, 2, 3, [4]]
 *
 * console.log(array);
 * // => [1]
 * ```
 */
export function concat<T>(...arrays: Array<Array<T>> | Array<T>): Array<T> {
  const length = arrays.length;
  if (!length) {
    return [];
  }
  const args = Array(length - 1);
  const array = arrays[0];
  let index = length;

  while (index--) {
    args[index - 1] = arrays[index];
  }

  return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
}

export default concat;
