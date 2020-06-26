import getTag from './.internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * ```js
 * isRegExp(/abc/)
 * // => true
 *
 * isRegExp('/abc/')
 * // => false
 * ```
 */
export function isRegExp(value: any): value is RegExp {
  return isObjectLike(value) && getTag(value) == '[object RegExp]';
}

export default isRegExp;
