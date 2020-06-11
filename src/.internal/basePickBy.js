import baseGet from './baseGet'
import baseSet from './baseSet'
import castPath from './castPath'
import flatten from '../flatten';

/**
 * The base implementation of `pickBy`.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths = [], predicate = () => true) {

  const result = {};

  flatten(paths).forEach(path => {
    const value = baseGet(object, path);
    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  })

  return result;
}

export default basePickBy
