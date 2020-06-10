import getTag from './.internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * ```js
 * isWeakSet(new WeakSet)
 * // => true
 *
 * isWeakSet(new Set)
 * // => false
 * ```
 */
export function isWeakSet(value: any): boolean {
  return isObjectLike(value) && getTag(value) == '[object WeakSet]';
}

export default isWeakSet;
