import baseAt from "./.internal/baseAt";
import basePullAt from "./.internal/basePullAt";
import compareAscending from "./.internal/compareAscending";
import isIndex from "./.internal/isIndex";
import arrayMap from "./.internal/arrayMap";
import flatRest from "./.internal/flatRest";

/**
 * @ignore
 */
const internalPullAt = flatRest((array, indexes) => {
  const length = array == null ? 0 : array.length,
    result = baseAt(array, indexes);

  basePullAt(array, arrayMap(indexes, (index) => isIndex(index, length) ? +index : index).sort(compareAscending));

  return result;
});

/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `at`, this method mutates `array`.
 *
 * @since 5.11.0
 * @category Array
 * @param array The array to modify.
 * @param indexes The indexes of elements to remove.
 * @returns Returns the new array of removed elements.
 * @see [[pull]], [[pullAll]], [[pullAllBy]], [[pullAllWith]], [[remove]], [[reject]]
 * @example
 *
 * ```js
 * const array = ['a', 'b', 'c', 'd']
 * const pulled = pullAt(array, [1, 3])
 *
 * console.log(array)
 * // => ['a', 'c']
 *
 * console.log(pulled)
 * // => ['b', 'd']
 * ```
 */
export function pullAt<T = any>(array: Array<T>, ...indexes: (number | string)[]): Array<T> {
  return internalPullAt(array, ...indexes);
}

export default pullAt;
