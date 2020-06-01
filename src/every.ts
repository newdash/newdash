import arrayEvery from './.internal/arrayEvery';
import baseEvery from './.internal/baseEvery';
import getIteratee from './.internal/getIteratee';
import isIterateeCall from './.internal/isIterateeCall';
import isArray from './isArray';

/**
 * Checks if `predicate` returns truthy for **all** elements of `collection`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * **Note:** This method returns `true` for
 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty collections.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * every([true, 1, null, 'yes'], Boolean);
 * // => false
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `matches` iteratee shorthand.
 * every(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `matchesProperty` iteratee shorthand.
 * every(users, ['active', false]);
 * // => true
 *
 * // The `property` iteratee shorthand.
 * every(users, 'active');
 * // => false
 */
function every(collection: any[] | object, predicate: Function, guard = undefined): boolean {
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  if (isArray(collection)) {
    return arrayEvery(collection, getIteratee(predicate, 3));
  }
  return baseEvery(collection, getIteratee(predicate, 3));

}

export default every;
