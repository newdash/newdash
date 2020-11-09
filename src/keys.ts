import arrayLikeKeys from './.internal/arrayLikeKeys';
import isArrayLike from './isArrayLike';

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @since 5.5.0
 * @category Object
 * @param object The object to query.
 * @returns Returns the array of property names.
 * @see [[values]], [[valuesIn]]
 * @example
 *
 * ```js
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * keys(new Foo)
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * keys('hi')
 * // => ['0', '1']
 * ```
 */
export function keys(object: any): string[] {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object));
}

export default keys;
