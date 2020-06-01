import baseUpdate from './.internal/baseUpdate';

/**
 * This method is like `update` except that it accepts `customizer` which is
 * invoked to produce the objects of `path`. If `customizer` returns `undefined`
 * path creation is handled by the method instead. The `customizer` is invoked
 * with three arguments: (nsValue, key, nsObject).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.3.0
 * @category Object
 * @param object The object to modify.
 * @param path The path of the property to set.
 * @param updater The function to produce the updated value.
 * @param customizer The function to customize assigned values.
 * @returns Returns `object`.
 * @example
 *
 * ```js
 * const object = {}
 *
 * updateWith(object, '[0][1]', () => 'a', Object)
 * // => { '0': { '1': 'a' } }
 * ```
 */
function updateWith<T>(object: T, path: Array<string> | string, updater?: (...any) => any, customizer?: (...any) => any): T {
  customizer = typeof customizer === 'function' ? customizer : undefined;
  return object == null ? object : baseUpdate(object, path, updater, customizer);
}

export default updateWith;
