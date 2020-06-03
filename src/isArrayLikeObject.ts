import isArrayLike from './isArrayLike';
import isObjectLike from './isObjectLike';

/**
 * This method is like `isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * ```js
 * isArrayLikeObject([1, 2, 3])
 * // => true
 *
 * isArrayLikeObject(document.body.children)
 * // => true
 *
 * isArrayLikeObject('abc')
 * // => false
 *
 * isArrayLikeObject(Function)
 * // => false
 * ```
 */
function isArrayLikeObject(value: any): boolean {
  return isObjectLike(value) && isArrayLike(value);
}

export default isArrayLikeObject;
