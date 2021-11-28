import baseWhile from "./.internal/baseWhile";

/**
 * Creates a slice of `array` excluding elements dropped from the end.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @since 5.16.0
 * @category Array
 * @param array The array to query.
 * @param predicate The function invoked per iteration.
 * @returns Returns the slice of `array`.
 * @example
 *
 *
 * ```js
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': true }
 * ]
 *
 * dropRightWhile(users, ({ active }) => active)
 * // => objects for ['barney']
 * ```
 */
export function dropRightWhile<T>(array: Array<T>, predicate: any): Array<T> {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true, true)
    : [];
}

export default dropRightWhile;
