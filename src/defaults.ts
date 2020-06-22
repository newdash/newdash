import eq from './eq';

/**
 * @ignore
 */
const objectProto = Object.prototype;

/**
 * @ignore
 */
const hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.7.0
 * @category Object
 * @param object The destination object.
 * @param sources The source objects.
 * @returns Returns `object`.
 * @see [[defaultsDeep]]
 * @example
 *
 * ```js
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 })
 * // => { 'a': 1, 'b': 2 }
 * ```
 */
export function defaults(object: any, ...sources: any[]): any {
  object = Object(object);
  sources.forEach((source) => {
    if (source != null) {
      source = Object(source);
      for (const key in source) {
        const value = object[key];
        if (value === undefined ||
          (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
          object[key] = source[key];
        }
      }
    }
  });
  return object;
}

export default defaults;
