import basePullAll from "./.internal/basePullAll";

/**
 * This method is like `pull` except that it accepts an array of values to remove.
 *
 * **Note:** Unlike `difference`, this method mutates `array`.
 *
 * @since 5.11.0
 * @category Array
 * @param array The array to modify.
 * @param values The values to remove.
 * @returns Returns `array`.
 * @see [[pull]], [[pullAllBy]], [[pullAllWith]], [[pullAt]], [[remove]], [[reject]]
 * @example
 *
 * ```js
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pullAll(array, ['a', 'c'])
 * console.log(array)
 * // => ['b', 'b']
 * ```
 */
export function pullAll<T>(array: Array<T>, values: Array<T>): Array<T> {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values)
    : array;
}

export default pullAll;
