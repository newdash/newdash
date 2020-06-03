import assignValue from './assignValue'
import baseAssignValue from './baseAssignValue'

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param source The object to copy properties from.
 * @param props The property identifiers to copy.
 * @param object The object to copy properties to.
 * @param customizer The function to customize copied values.
 * @returns Returns `object`.
 */
function copyObject(source: any, props: any, object: any, customizer?: any) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
    length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

export default copyObject
