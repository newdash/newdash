import baseUpdate from './.internal/baseUpdate';

/**
 * This method is like `set` except that it accepts `updater` to produce the
 * value to set. Use `updateWith` to customize `path` creation. The `updater`
 * is invoked with one argument: (value).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.3.0
 * @category Object
 * @param object The object to modify.
 * @param path The path of the property to set.
 * @param updater The function to produce the updated value.
 * @returns Returns `object`.
 * @example
 *
 * ```js
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * update(object, 'a[0].b.c', n => n * n)
 * console.log(object.a[0].b.c)
 * // => 9
 *
 * update(object, 'x[0].y.z', n => n ? n + 1 : 0)
 * console.log(object.x[0].y.z)
 * // => 0
 * ```
 */
function update<U extends(...any) => any>(object: any, path: Array<string> | string, updater?: U): ReturnType<U> {
  return object == null ? object : baseUpdate(object, path, updater);
}

export default update;
