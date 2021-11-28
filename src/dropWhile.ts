import baseWhile from "./.internal/baseWhile";

/**
 * Creates a slice of `array` excluding elements dropped from the beginning.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param array The array to query.
 * @param predicate The function invoked per iteration.
 * @returns Returns the slice of `array`.
 * @example
 *
 * ```js
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': false }
 * ]
 *
 * dropWhile(users, ({ active }) => active)
 * // => objects for ['pebbles']
 * ```
 */
export function dropWhile<T>(array: Array<T>, predicate: any): Array<T> {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true)
    : [];
}

export default dropWhile;
