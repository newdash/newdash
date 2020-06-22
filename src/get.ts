import baseGet from './.internal/baseGet';

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 5.3.0
 * @category Object
 * @param object The object to query.
 * @param path The path of the property to get.
 * @param defaultValue The value returned for `undefined` resolved values.
 * @returns Returns the resolved value.
 * @see has, hasIn, set, unset
 * @example
 *
 * ```js
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 * ```
 */
export function get(object: any, path: Array<string>, defaultValue?: any): any;
export function get(object: any, path: string, defaultValue?: any): any;
export function get(object: any, path: any, defaultValue?: any): any {
  const result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}


export default get;
