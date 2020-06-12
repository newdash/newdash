import castPath from './castPath'
import last from '../last'
import parent from './parent'
import toKey from './toKey'

/**
 * The base implementation of `unset`.
 *
 * @private
 * @ignore
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object)
  object = parent(object, path)
  try {
    const rt = object == null || delete object[toKey(last(path))]
    return rt
  } catch (error) {
    if (error instanceof TypeError) {
      if (error.message.includes("Cannot delete property")) {
        return false
      }
    }
    throw error
  }
}

export default baseUnset
