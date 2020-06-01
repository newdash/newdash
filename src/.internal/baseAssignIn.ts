import copyObject from "./copyObject";
import keysIn from "../keysIn";

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param object The destination object.
 * @param source The source object.
 * @returns Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

export default baseAssignIn
