import baseFlatten from './.internal/baseFlatten';

/**
 * Recursively flatten `array` up to `depth` times.
 *
 * @since 5.4.0
 * @category Array
 * @param array The array to flatten.
 * @param depth The maximum recursion depth.
 * @returns Returns the new flattened array.
 * @see [[flatMap]],[[flatMapDeep]],[[flatMapDepth]],[[flattenDeep]]
 * @example
 *
 * ```js
 * const array = [1, [2, [3, [4]], 5]]
 *
 * flattenDepth(array, 1)
 * // => [1, 2, [3, [4]], 5]
 *
 * flattenDepth(array, 2)
 * // => [1, 2, 3, [4], 5]
 * ```
 */
function flattenDepth(array: Array<any>, depth = 1): Array<any> {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  depth = depth === undefined ? 1 : +depth;
  return baseFlatten(array, depth);
}

export default flattenDepth;
