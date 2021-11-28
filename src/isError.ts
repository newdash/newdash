import getTag from "./.internal/getTag";
import isObjectLike from "./isObjectLike";
import isPlainObject from "./isPlainObject";

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * ```js
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 * ```
 */
export function isError(value: any): value is Error {
  if (!isObjectLike(value)) {
    return false;
  }
  if (Error && value instanceof Error) {
    return true;
  }
  if (DOMException && value instanceof DOMException) {
    return true;
  }
  const tag = getTag(value);
  return tag == "[object Error]" || tag == "[object DOMException]" ||
    (typeof value.message === "string" && typeof value.name === "string" && !isPlainObject(value));
}

export default isError;
