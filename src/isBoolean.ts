import getTag from './.internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * ```js
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 * ```
 */
function isBoolean(value: any): value is boolean {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]');
}

export default isBoolean;
