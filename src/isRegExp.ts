import getTag from './.internal/getTag';
import isObjectLike from './isObjectLike';
import nodeTypes from './.internal/nodeTypes';

/* Node helper references. */
const nodeIsRegExp = nodeTypes && nodeTypes.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * isRegExp(/abc/)
 * // => true
 *
 * isRegExp('/abc/')
 * // => false
 */
const isRegExp = nodeIsRegExp
  ? (value) => nodeIsRegExp(value)
  : (value) => isObjectLike(value) && getTag(value) == '[object RegExp]';

export default isRegExp;
