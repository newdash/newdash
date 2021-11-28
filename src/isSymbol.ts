import getTag from "./.internal/getTag";
import isObjectLike from "./isObjectLike";

/**
 * @ignore
 */
const symbolTag = "[object Symbol]";


/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * ```js
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 * ```
 */
export function isSymbol(value: any): value is Symbol {
  return typeof value == "symbol" || (isObjectLike(value) && getTag(value) == symbolTag);
}

export default isSymbol;
