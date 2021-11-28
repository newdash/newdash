// @ts-nocheck
import map from "./map";
import basePickBy from "./.internal/basePickBy";
import getAllKeysIn from "./.internal/getAllKeysIn";

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @since 5.7.0
 * @category Object
 * @param object The source object.
 * @param predicate The function invoked per property.
 * @returns Returns the new object.
 * @example
 *
 * ```js
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pickBy(object, isNumber)
 * // => { 'a': 1, 'c': 3 }
 * ```
 */
export function pickBy(object: any, predicate: (value: any) => boolean): any {
  if (object == null) {
    return {};
  }
  const props = map(getAllKeysIn(object), (prop) => [prop]);
  return basePickBy(object, props, (value, path) => predicate(value, path[0]));
}

export default pickBy;
