import baseKeys from "./.internal/baseKeys";
import getTag from "./.internal/getTag";
import isPrototype from "./.internal/isPrototype";
import isArguments from "./isArguments";
import isArrayLike from "./isArrayLike";
import isBuffer from "./isBuffer";
import isTypedArray from "./isTypedArray";

/**
 * Used to check objects for own properties.
 * @ignore
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @ignore
 */
const mapTag = "[object Map]";
/**
 * @ignore
 */
const setTag = "[object Set]";
/**
 * @ignore
 * @internal
 * @private
 */
const isArray = Array.isArray;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * heavy operation
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * ```js
 * isEmpty(null)
 * // => true
 *
 * isEmpty(true)
 * // => true
 *
 * isEmpty(1)
 * // => true
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty({ 'a': 1 })
 * // => false
 * ```
 */
export function isEmpty(value?: any): boolean {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
    (isArray(value) || typeof value == "string" || typeof value["splice"] == "function" ||
      isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  const tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

export default isEmpty;
