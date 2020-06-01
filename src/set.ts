import baseSet from './.internal/baseSet';

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.3.0
 * @category Object
 * @param object The object to modify.
 * @param path The path of the property to set.
 * @param value The value to set.
 * @returns Returns `object`.
 * @see [[has]],[[hasIn]],[[get]],[[unset]]
 * @example
 *
 * ```js
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * console.log(object.a[0].b.c)
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5)
 * console.log(object.x[0].y.z)
 * // => 5
 * ```
 */
function set(object: any, path: Array<string>, value: any);
function set(object: any, path: string, value: any);
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

export default set;
