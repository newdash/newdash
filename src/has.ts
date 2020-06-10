/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks if `key` is a direct property of `object`.
 *
 * @since 5.3.0
 * @category Object
 * @param object The object to query.
 * @param key The key to check.
 * @returns Returns `true` if `key` exists, else `false`.
 * @see [[hasIn]],[[hasPath]],[[hasPathIn]]
 * @example
 *
 * ```js
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * has(object, 'a')
 * // => true
 *
 * has(other, 'a')
 * // => false
 * ```
 */
export function has(object: any, key: string): boolean {
  return object != null && hasOwnProperty.call(object, key);
}

export default has;
