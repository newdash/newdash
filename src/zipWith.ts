import unzipWith from './unzipWith';

/**
 * This method is like `zip` except that it accepts `iteratee` to specify
 * how grouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @since 5.7.0
 * @category Array
 * @param arrays The arrays to process.
 * @param iteratee The function to combine
 *  grouped values.
 * @returns Returns the new array of grouped elements.
 * @see [[unzip]],[[unzipWith]],[[zip]],[[zipObject]],[[zipObjectDeep]],[[zipWith]]
 * @example
 *
 * ```js
 * zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c)
 * // => [111, 222]
 * ```
 */
export function zipWith<T>(arrays: Array<Array<T>>, iteratee?: Function): Array<T> {
  return unzipWith(arrays, iteratee);
}

export default zipWith;
