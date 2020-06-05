import isPrototype from "./isPrototype";

const nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param object The object to query.
 * @returns Returns the array of property names.
 */
export function baseKeys(object: any): string[] {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (Object.hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

export default baseKeys
