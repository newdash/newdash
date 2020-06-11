import castPath from './.internal/castPath';
import isArguments from './isArguments';
import isIndex from './.internal/isIndex';
import isLength from './isLength';
import toKey from './.internal/toKey';
import isArray from './isArray';

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @see has, hasIn, hasPathIn
 * @example
 *
 * ```js
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * hasPath(object, 'a.b')
 * // => true
 *
 * hasPath(object, ['a', 'b'])
 * // => true
 * ```
 */
export function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  let index = -1,
    length = path.length,
    result = false;
  let key: any;
  while (++index < length) {
    key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

export default hasPath;
