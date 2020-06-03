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
  const result = [];
  for (const key in object) {
    result.push(key);
  }
  return result;
}

export default keysIn;

