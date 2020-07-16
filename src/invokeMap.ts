import baseEach from './.internal/baseEach';
import invoke from './invoke';
import isArrayLike from './isArrayLike';
import baseRest from './.internal/baseRest';
import { baseInvoke } from './.internal/baseInvoke';

import apply from './.internal/apply';
import { Collection, Path, ArrayAble } from './types';

/**
 * @ignore
 * @private
 * @internal
 */
const internalInvokeMap = baseRest((collection, path, args) => {
  let index = -1;
  const isFunc = typeof path == 'function';
  const result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, (value: any) => {
    result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
  });
  return result;
});

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `path` is a function, it's invoked
 * for, and `this` bound to, each element in `collection`.
 *
 * @since 5.12.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array|Function|string} path The path of the method to invoke or
 *  the function invoked per iteration.
 * @param {Array} [args] The arguments to invoke each method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * ```js
 * invokeMap([[5, 1, 7], [3, 2, 1]], 'sort')
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * invokeMap([123, 456], String.prototype.split, [''])
 * // => [['1', '2', '3'], ['4', '5', '6']]
 * ```
 */
export function invokeMap(collection: Collection, path: Path, ...args: any[]): Array<any>;
export function invokeMap<T, F extends (...args: any[]) => any>(collection: Collection<T>, path: F, ...args: Parameters<F>): Array<ReturnType<F>>;
export function invokeMap(collection: any, path?: any, ...args: any[]): any;
export function invokeMap(collection: any, path: any, ...args: any[]): any {
  return internalInvokeMap(collection, path, ...args);
}

export default invokeMap;
