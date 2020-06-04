import isArrayLike from './isArrayLike';
import arrayLikeKeys from './.internal/arrayLikeKeys';
import isObject from './isObject';
import isPrototype from './.internal/isPrototype';

/**
 * @ignore
 * @private
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @private
 * @ignore
 * @param object
 */
function nativeKeysIn(object: any): string[] {
  const result = [];
  if (object != null) {
    for (const key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * @ignore
 * @private
 * @param object ant
 */
function baseKeysIn(object: any): string[] {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  const isProto = isPrototype(object);
  const result = [];
  for (const key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 *
 * @since 5.5.0
 * @category Object
 * @param object The object to query.
 * @returns Returns the array of property names.
 * @example
 *
 * ```js
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 * ```
 */
function keysIn(object: any): string[] {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

export default keysIn;

