import baseValues from "./.internal/baseValues";
import keys from "./keys";
import { Values } from "./types";

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @since 5.17.0
 * @category Object
 * @param object The object to query.
 * @returns Returns the array of property values.
 * @see [[keys]], [[valuesIn]]
 * @example
 *
 *
 * ```js
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * values(new Foo)
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * values('hi')
 * // => ['h', 'i']
 * ```
 */
export function values<T extends object>(object: T): Values<T> {
  return object == null ? [] : baseValues(object, keys(object));
}

export default values;
