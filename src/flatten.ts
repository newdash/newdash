import baseFlatten from "./.internal/baseFlatten";

/**
 * Flattens `array` a single level deep.
 *
 * @since 5.4.0
 * @category Array
 * @param The array to flatten.
 * @returns Returns the new flattened array.
 * @see [[flatMap]],[[flatMapDeep]],[[flatMapDepth]],[[flattenDeep]],[[flattenDepth]]
 * @example
 *
 * ```js
 * flatten([1, [2, [3, [4]], 5]])
 * // => [1, 2, [3, [4]], 5]
 * ```
 */
export function flatten(array: Array<any>): Array<any> {
  const length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

export default flatten;
