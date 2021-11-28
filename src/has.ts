import hasPath from "./hasPath";
import { Path } from "./types";
import { baseHas } from "./.internal/baseHas";

/**
 * Checks if `key` is a direct property of `object`.
 *
 * @since 5.3.0
 * @category Object
 * @param object The object to query.
 * @param path The key to check.
 * @returns Returns `true` if `key` exists, else `false`.
 * @see [[hasIn]],[[hasPath]],[[hasPathIn]]
 * @example
 *
 * ```js
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * has(object, 'a')
 * // => true
 *
 * has(other, 'a')
 * // => false
 * ```
 */
export function has(object: any, path: Path): boolean {
  return object != null && hasPath(object, path, baseHas);
}

export default has;
