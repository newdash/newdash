import keys from './keys';
import arrayFilter from './.internal/arrayFilter';
import isFunction from './isFunction';


/**
 * @ignore
 * @private
 * @internal
 * @param object
 * @param props
 */
function baseFunctions(object, props) {
  return arrayFilter(props, (key) => isFunction(object[key]));
}

/**
 * Creates an array of function property names from own enumerable properties
 * of `object`.
 *
 * @since 5.12.0
 * @category Object
 * @param object The object to inspect.
 * @returns Returns the function names.
 * @see [[functionsIn]]
 * @example
 *
 * ```js
 * function Foo() {
 *   this.a = () => 'a'
 *   this.b = () => 'b'
 * }
 *
 * Foo.prototype.c = () => 'c'
 *
 * functions(new Foo)
 * // => ['a', 'b']
 * ```
 */
export function functions(object: any): string[] {
  return object == null ? [] : baseFunctions(object, keys(object));
}

export default functions;
