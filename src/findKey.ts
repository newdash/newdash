import baseFindKey from './.internal/baseFindKey';
import getIteratee from './.internal/getIteratee';
import baseForOwn from './.internal/baseForOwn';

/**
 * This method is like `find` except that it returns the key of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @since 5.2.0
 * @category Object
 * @param object The object to inspect.
 * @param predicate The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @see find, findIndex, findLast, findLastIndex, findLastKey
 * @example
 *
 * ```js
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * }
 *
 * findKey(users, ({ age }) => age < 40)
 * // => 'barney' (iteration order is not guaranteed)
 * ```
 */
function findKey(object, predicate?): string | undefined {
  return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
}

export default findKey;
