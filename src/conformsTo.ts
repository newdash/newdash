import baseConformsTo from "./.internal/baseConformsTo";
import keys from "./keys";

/**
 * Checks if `object` conforms to `source` by invoking the predicate
 * properties of `source` with the corresponding property values of `object`.
 *
 * **Note:** This method is equivalent to `conforms` when `source` is
 * partially applied.
 *
 * @since 5.12.0
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 * @example
 *
 * ```js
 * const object = { 'a': 1, 'b': 2 }
 *
 * conformsTo(object, { 'b': function(n) { return n > 1 } })
 * // => true
 *
 * conformsTo(object, { 'b': function(n) { return n > 2 } })
 * // => false
 * ```
 */
export function conformsTo<T extends Record<string, any>>(
  object: T,
  source: { [key in keyof T]?: (value: any) => boolean }
): boolean {
  return source == null || baseConformsTo(object, source, keys(source));
}

export default conformsTo;
