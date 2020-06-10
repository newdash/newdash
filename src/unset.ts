import baseUnset from './.internal/baseUnset';

/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.3.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 * @see get,has,set
 * @example
 *
 * ```js
 * const object = { 'a': [{ 'b': { 'c': 7 } }] }
 * unset(object, 'a[0].b.c')
 * // => true
 *
 * console.log(object)
 * // => { 'a': [{ 'b': {} }] }
 *
 * unset(object, ['a', '0', 'b', 'c'])
 * // => true
 *
 * console.log(object)
 * // => { 'a': [{ 'b': {} }] }
 * ```
 */
export function unset<T>(object: T, path: Array<string>): T;
export function unset<T>(object: T, path: string): T;
export function unset(object: any, path: any): any {
  return object == null ? true : baseUnset(object, path);
}

export default unset;
