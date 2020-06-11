// @ts-nocheck
import hasPath from './hasPath';

/**
 * @ignore
 * @private
 * @param object
 * @param key
 */
function baseHasIn(object: any, key: any): boolean {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @since 5.7.0
 * @category Object
 * @param object The object to query.
 * @param key The key to check.
 * @returns Returns `true` if `key` exists, else `false`.
 * @see [[has]],[[hasPath]],[[hasPathIn]]
 * @example
 *
 * ```js
 * const object = create({ 'a': create({ 'b': 2 }) })
 *
 * hasIn(object, 'a')
 * // => true
 *
 * hasIn(object, 'b')
 * // => false
 * ```
 */
function hasIn(object: any, key: any): boolean {
  return object != null && hasPath(object, key, baseHasIn);
}

export default hasIn;
