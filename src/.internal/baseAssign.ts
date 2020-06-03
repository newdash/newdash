import copyObject from "./copyObject";
import keys from "../keys";

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @ignore
 * @param object The destination object.
 * @param source The source object.
 * @returns Returns `object`.
 */
function baseAssign(object: any, source: any): any {
  return object && copyObject(source, keys(source), object);
}

export default baseAssign
