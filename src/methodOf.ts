import invoke from './invoke';
import baseRest from './.internal/baseRest';
import baseInvoke from './.internal/baseInvoke';


const internalMethodOf = baseRest((object, args) => function(path) {
  return baseInvoke(object, path, args);
});

/**
 * The opposite of `method` this method creates a function that invokes
 * the method at a given path of `object`. Any additional arguments are
 * provided to the invoked method.
 *
 * @since 5.12.0
 * @category Util
 * @param object The object to query.
 * @param args The arguments to invoke the method with.
 * @returns Returns the new invoker function.
 * @example
 *
 * ```js
 * const array = times(3, i => () => i)
 * const object = { 'a': array, 'b': array, 'c': array }
 *
 * map(['a[2]', 'c[0]'], methodOf(object))
 * // => [2, 0]
 *
 * map([['a', '2'], ['c', '0']], methodOf(object))
 * // => [2, 0]
 * ```
 */
export function methodOf(object: any, ...args: any[]): any {
  return internalMethodOf(object, ...args);
}

export default methodOf;
