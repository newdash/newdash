import baseClone from "./.internal/baseClone";
import baseConforms from "./.internal/baseConforms";

/**
 * @ignore
 * @private
 * @internal
 */
const CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that invokes the predicate properties of `source` with
 * the corresponding property values of a given object, returning `true` if
 * all predicates return truthy, else `false`.
 *
 * **Note:** The created function is equivalent to `conformsTo` with
 * `source` partially applied.
 *
 * @since 5.12.0
 * @category Util
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 * @example
 *
 * ```js
 * const objects = [
 *   { 'a': 2, 'b': 1 },
 *   { 'a': 1, 'b': 2 }
 * ]
 *
 * filter(objects, conforms({ 'b': function(n) { return n > 1 } }))
 * // => [{ 'a': 1, 'b': 2 }]
 * ```
 */
export function conforms<T extends Record<string, any>>(
  source: { [key in keyof T]?: (value: any) => boolean }
): (obj: T) => boolean;
export function conforms(source: any): any;
export function conforms(source: any): any {
  return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
}

export default conforms;
