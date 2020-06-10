import getTag from './.internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * ```js
 * isWeakMap(new WeakMap)
 * // => true
 *
 * isWeakMap(new Map)
 * // => false
 * ```
 */
export function isWeakMap(value: any): boolean {
  return isObjectLike(value) && getTag(value) == '[object WeakMap]';
}

export default isWeakMap;
