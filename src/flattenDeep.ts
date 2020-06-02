import baseFlatten from './.internal/baseFlatten';

/** Used as references for various `Number` constants. */
const INFINITY = Infinity;

/**
 * Recursively flattens `array`.
 *
 * @since 5.4.0
 * @category Array
 * @param array The array to flatten.
 * @returns Returns the new flattened array.
 * @see [[flatMap]],[[flatMapDeep]],[[flatMapDepth]],[[flatten]],[[flattenDepth]]
 * @example
 *
 * ```js
 * flattenDeep([1, [2, [3, [4]], 5]])
 * // => [1, 2, 3, 4, 5]
 * ```
 */
function flattenDeep(array: Array<any>): Array<any> {
  const length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY) : [];
}

export default flattenDeep;
