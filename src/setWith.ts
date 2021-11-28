import baseSet from "./.internal/baseSet";

/**
 * This method is like `set` except that it accepts `customizer` which is
 * invoked to produce the objects of `path`. If `customizer` returns `undefined`
 * path creation is handled by the method instead. The `customizer` is invoked
 * with three arguments: (nsValue, key, nsObject).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.3.0
 * @category Object
 * @param object The object to modify.
 * @param ath The path of the property to set.
 * @param value The value to set.
 * @param customizer The function to customize assigned values.
 * @returns Returns `object`.
 * @example
 *
 * ```js
 * const object = {}
 *
 * setWith(object, '[0][1]', 'a', Object)
 * // => { '0': { '1': 'a' } }
 * ```
 */
function setWith<T>(object: T, path: Array<string> | string, value?: any, customizer?: (...any) => any): T {
  customizer = typeof customizer === "function" ? customizer : undefined;
  return object == null ? object : baseSet(object, path, value, customizer);
}

export default setWith;
