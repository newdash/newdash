import baseClone from "./.internal/baseClone";

/**
 * Used to compose bitmasks for cloning.
 *
 * @ignore
 *
 */
const CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a **shallow** clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexps, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. Object inheritance is preserved. An empty object is
 * returned for uncloneable values such as error objects, functions, DOM nodes,
 * and WeakMaps.
 *
 * @since 5.3.0
 * @category Lang
 * @param value The value to clone.
 * @returns Returns the cloned value.
 * @see [[cloneDeep]]
 * @example
 *
 * ```js
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const shallow = clone(objects)
 * console.log(shallow[0] === objects[0])
 * // => true
 * ```
 */
export function clone<T>(value: T): T {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}

export default clone;
