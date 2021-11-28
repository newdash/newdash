import baseProperty from "./.internal/baseProperty";
import basePropertyDeep from "./.internal/basePropertyDeep";
import isKey from "./.internal/isKey";
import toKey from "./.internal/toKey";
import { Path } from "./types";

/**
 * @ignore
 */
interface Accessor {
  (obj: any): any
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @since 5.0.0
 * @category Util
 * @param path The path of the property to get.
 * @example
 *
 * ```js
 * const objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ]
 *
 * map(objects, property('a.b'))
 * // => [2, 1]
 *
 * map(sortBy(objects, property(['a', 'b'])), 'a.b')
 * // => [1, 2]
 * ```
 */
export function property(path: Path): Accessor {
  // @ts-ignore
  return isKey(path) ? baseProperty(toKey(path) as any) : basePropertyDeep(path);
}

export default property;
