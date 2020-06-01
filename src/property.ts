import baseProperty from './.internal/baseProperty';
import basePropertyDeep from './.internal/basePropertyDeep';
import isKey from './.internal/isKey';
import toKey from './.internal/toKey';

/**
 * @ignore
 */
interface Accessor {
  (obj: any): any
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
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
function property(path: Array<any> | string): Accessor {
  // @ts-ignore
  return isKey(path) ? baseProperty(toKey(path) as any) : basePropertyDeep(path);
}

export default property;
