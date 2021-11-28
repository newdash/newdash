import { RecordIteratee } from "./types";

/**
 * Checks if `predicate` returns truthy for **any** element of `object`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, key, object).
 *
 * @since 5.11.0
 * @category Object
 * @param object The object to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * ```js
 * someValues({ 'a': 0, 'b': 'yes', 'c': false }, Boolean)
 * // => true
 * ```
 */
export function someValues<T = any>(object: Record<string, T>, predicate: RecordIteratee<T, boolean>): boolean {
  object = Object(object);
  const props = Object.keys(object);

  for (const key of props) {
    if (predicate(object[key], key, object)) {
      return true;
    }
  }
  return false;
}

export default someValues;
