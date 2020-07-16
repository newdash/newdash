import castPath from './.internal/castPath';
import last from './last';
import parent from './.internal/parent';
import toKey from './.internal/toKey';
import baseRest from './.internal/baseRest';
import baseInvoke from './.internal/baseInvoke';


/**
 * @ignore
 * @internal
 * @private
 */
const internalInvoke = baseRest(baseInvoke);

/**
 * Invokes the method at `path` of `object`.
 *
 * @since 5.7.0
 * @category Object
 * @param object The object to query.
 * @param path The path of the method to invoke.
 * @param args The arguments to invoke the method with.
 * @returns Returns the result of the invoked method.
 * @example
 *
 * ```js
 * const object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] }
 *
 * invoke(object, 'a[0].b.c.slice', [1, 3])
 * // => [2, 3]
 * ```
 */
export function invoke(object: any, path: any, ...args: any[]): any {
  return internalInvoke(object, path, ...args);
}

export default invoke;
