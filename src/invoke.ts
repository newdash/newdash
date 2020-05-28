import castPath from './.internal/castPath';
import last from './last';
import parent from './.internal/parent';
import toKey from './.internal/toKey';

/**
 * Invokes the method at `path` of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} [args] The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] }
 *
 * invoke(object, 'a[0].b.c.slice', [1, 3])
 * // => [2, 3]
 */
function invoke(object, path, args) {
  path = castPath(path, object);
  object = parent(object, path);
  const func = object == null ? object : object[toKey(last(path))];
  return func == null ? undefined : func.apply(object, args);
}

export default invoke;
