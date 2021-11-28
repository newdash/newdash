import isSymbol from "./isSymbol";
import isArray from "./isArray";
import arrayMap from "./.internal/arrayMap";

/**
 * @ignore
 * @private
 */
const symbolToString = Symbol?.prototype?.toString;

/**
 * Used as references for various `Number` constants.
 * @ignore
 */
const INFINITY = Infinity;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to convert.
 * @returns Returns the converted string.
 * @example
 *
 * ```js
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 * ```
 */
export function toString(value: any): string {
  if (value == null) {
    return "";
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == "string") {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${arrayMap(value, toString)}`;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  const result = (`${value}`);
  return (result == "0" && (1 / value) == -INFINITY) ? "-0" : result;
}

export default toString;
