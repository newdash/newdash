import { PlainObject, CollectionIteratee } from './types';

/**
 * Checks if `predicate` returns truthy for **all** properties of `object`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, key, object).
 *
 * **Note:** This method returns `true` for
 * [empty objects](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty objects.
 *
 * @since 5.11.0
 * @category Object
 * @param object The object to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns `true` if all properties pass the predicate check,
 *  else `false`.
 * @example
 *
 * ```js
 * everyValue({ 'a': 0, 'b': 'yes', 'c': false }, Boolean)
 * // => false
 * ```
 */
export function everyValue<T>(object: PlainObject<T>, predicate: CollectionIteratee<T, boolean>): boolean;
export function everyValue(object: any, predicate: any): boolean {
  object = Object(object);
  const props = Object.keys(object);

  for (const key of props) {
    if (!predicate(object[key], key, object)) {
      return false;
    }
  }
  return true;
}

export default everyValue;
