import baseAssignValue from './baseAssignValue'
import eq from '../eq'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent.
 *
 * @private
 * @param object The object to modify.
 * @param key The key of the property to assign.
 * @param value The value to assign.
 */
function assignValue(object: any, key: string, value: any): any {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
    (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}


export default assignValue
