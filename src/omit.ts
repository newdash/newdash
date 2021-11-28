import arrayMap from "./.internal/arrayMap";
import baseClone from "./.internal/baseClone";
import baseUnset from "./.internal/baseUnset";
import castPath from "./.internal/castPath";
import { CLONE_DEEP_FLAG, CLONE_FLAT_FLAG, CLONE_SYMBOLS_FLAG } from "./.internal/CONSTANTS";
import copyObject from "./.internal/copyObject";
import flatRest from "./.internal/flatRest";
import getAllKeysIn from "./.internal/getAllKeysIn";
import isPlainObject from "./isPlainObject";
import { Path } from "./types";

/**
  * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
  * objects.
  *
  * @internal
  * @ignore
  * @private
  * @param value The value to inspect.
  * @param key The key of the property to inspect.
  * @returns Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
  */
function customOmitClone(value: any): any {
  return isPlainObject(value) ? undefined : value;
}
/**
  * @internal
  * @ignore
  * @private
  */
const internalOmit = flatRest((object: any, paths: any) => {
  let result = {};
  if (object == null) {
    return result;
  }
  let isDeep = false;
  paths = arrayMap(paths, (path) => {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  let length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

/**
 * The opposite of [[pick]];
 *
 * this method creates an object composed of the own and inherited enumerable property paths of object that are not omitted.
 * @category Object
 * @since 5.18.0
 * @param object
 * @param paths
 * @example
 * ```js
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 * ```
 */
export function omit<T extends any>(object: T, ...paths: Array<Path>): Partial<T>;
export function omit(object: any, ...paths: any): any {
  return object == null ? {} : internalOmit(object, ...paths);
}


export default omit;
