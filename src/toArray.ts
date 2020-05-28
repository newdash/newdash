import copyArray from './.internal/copyArray';
import getTag from './.internal/getTag';
import isArrayLike from './isArrayLike';
import isString from './isString';
import iteratorToArray from './.internal/iteratorToArray';
import mapToArray from './.internal/mapToArray';
import setToArray from './.internal/setToArray';
import stringToArray from './.internal/stringToArray';
import values from './values';

/** `Object#toString` result references. */
const mapTag = '[object Map]';
const setTag = '[object Set]';

/** Built-in value references. */
const symIterator = Symbol.iterator;

/**
 * Converts `value` to an array.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * toArray({ 'a': 1, 'b': 2 })
 * // => [1, 2]
 *
 * toArray('abc')
 * // => ['a', 'b', 'c']
 *
 * toArray(1)
 * // => []
 *
 * toArray(null)
 * // => []
 */
function toArray(value) {
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray(value[symIterator]());
  }
  const tag = getTag(value);
  const func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

  return func(value);
}

export default toArray;
