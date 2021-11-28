import { invoke } from "./invoke";
import { Path } from "./types";

/**
 * Creates a function that invokes the method at `path` of a given object.
 * Any additional arguments are provided to the invoked method.
 *
 * @since 5.11.0
 * @category Util
 * @param path The path of the method to invoke.
 * @param args The arguments to invoke the method with.
 * @returns Returns the new invoker function.
 * @example
 *
 * ```js
 * const objects = [
 *   { 'a': { 'b': () => 2 } },
 *   { 'a': { 'b': () => 1 } }
 * ]
 *
 * map(objects, method('a.b'))
 * // => [2, 1]
 *
 * map(objects, method(['a', 'b']))
 * // => [2, 1]
 * ```
 */
export function method(path: Path, ...args: any[]): any {
  return (object: any) => invoke(object, path, ...args);
}

export default method;
