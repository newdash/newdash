// @ts-nocheck
import map from "./map";
import copyArray from "./.internal/copyArray";
import isSymbol from "./isSymbol";
import stringToPath from "./.internal/stringToPath";
import toKey from "./.internal/toKey";

/**
 * Converts `value` to a property path array.
 *
 * @since 5.7.0
 * @category Util
 * @param value The value to convert.
 * @returns Returns the new property path array.
 * @example
 *
 * ```js
 * toPath('a.b.c')
 * // => ['a', 'b', 'c']
 *
 * toPath('a[0].b.c')
 * // => ['a', '0', 'b', 'c']
 * ```
 */
function toPath(value: Array<string>): Array<string>;
function toPath(value: string): Array<string>;
function toPath(value: any): Array<string> {
  if (Array.isArray(value)) {
    return map(value, toKey);
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(value));
}

export default toPath;
