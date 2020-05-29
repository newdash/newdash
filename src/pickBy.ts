import map from './map';
import basePickBy from './.internal/basePickBy';
import getAllKeysIn from './.internal/getAllKeysIn';

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * ```js
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pickBy(object, isNumber)
 * // => { 'a': 1, 'c': 3 }
 * ```
 */
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  const props = map(getAllKeysIn(object), (prop) => [prop]);
  // @ts-ignore
  return basePickBy(object, props, (value, path) => predicate(value, path[0]));
}

export default pickBy;
