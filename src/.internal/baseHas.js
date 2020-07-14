
/**
 * @ignore
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @ignore
 * @internal
 * @private
 *
 * @param {*} object
 * @param {*} key
 */
export function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

export default baseHas
