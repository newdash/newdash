import createAssigner from "./.internal/createAssigner";
import copyObject from "./.internal/copyObject";
import keysIn from "./keysIn";

/**
 * @private
 * @ignore
 */
const internal = createAssigner((object: any, source: any) => {
  copyObject(source, keysIn(source), object);
});

/**
 * This method is like `assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.5.0
 * @alias extend
 * @category Object
 * @param target The destination object.
 * @param sources The source objects.
 * @returns Returns `object`.
 * @see [[assign]]
 * @example
 *
 * ```js
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 * ```
 */
export function assignIn(target: any, ...args: any[]): any {
  return internal(target, ...args);
}

export default assignIn;
