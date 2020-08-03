import { symToStringTag } from "./GLOBAL";


const nullTag = '[object Null]'

const undefinedTag = '[object Undefined]';


/**
 * @ignore
 * @param value 
 */
function getRawTag(value) {
  var isOwn = Object.prototype.hasOwnProperty.call(value, Symbol.toStringTag)
  const tag = value[Symbol.toStringTag];

  try {
    value[Symbol.toStringTag] = undefined;
    var unmasked = true;
  } catch (e) { }

  var result = Object.prototype.toString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param value The value to query.
 * @returns Returns the `toStringTag`.
 */
export function getTag(value: any): string {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : Object.prototype.toString.call(value);
}

export default getTag
