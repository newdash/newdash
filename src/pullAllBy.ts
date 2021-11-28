import basePullAll from "./.internal/basePullAll";
import { ArrayIteratee, KeyIteratee } from "./types";

/**
 * This method is like `pullAll` except that it accepts `iteratee` which is
 * invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The iteratee is invoked with one argument: (value).
 *
 * **Note:** Unlike `differenceBy`, this method mutates `array`.
 *
 * @since 5.11.0
 * @category Array
 * @param array The array to modify.
 * @param values The values to remove.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns `array`.
 * @see [[pull]], [[pullAll]], [[pullAllWith]], [[pullAt]], [[remove]], [[reject]]
 * @example
 *
 * ```js
 * const array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }]
 *
 * pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x')
 * console.log(array)
 * // => [{ 'x': 2 }]
 * ```
 */
export function pullAllBy<T>(array: Array<T>, values: Array<T>, iteratee: ArrayIteratee<T> | KeyIteratee): Array<T> {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values, iteratee)
    : array;
}

export default pullAllBy;
