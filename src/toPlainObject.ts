/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @since 5.13.0
 * @category Lang
 * @param value The value to convert.
 * @returns Returns the converted plain object.
 * @example
 *
 * ```js
 * function Foo() {
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * assign({ 'a': 1 }, new Foo)
 * // => { 'a': 1, 'b': 2 }
 *
 * assign({ 'a': 1 }, toPlainObject(new Foo))
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 * ```
 */
export function toPlainObject<T extends any>(value: T): T {
  return Object.assign({}, value);
}

export default toPlainObject;
