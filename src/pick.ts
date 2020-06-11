import basePick from './.internal/basePick';

type Path = string | number | Array<Path>

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @since 5.7.0
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * ```js
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pick(object, ['a', 'c'])
 * // => { 'a': 1, 'c': 3 }
 * ```
 */
export function pick(object: any, ...paths: Array<Path>): any;
export function pick(object: any, ...paths: any): any {
  return object == null ? {} : basePick(object, paths);
}

export default pick;
