import { createInverter } from "./.internal/createInverter";
import { getIteratee } from "./.internal/getIteratee";
import { RecordIteratee } from "./types";


/**
 * @ignore
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @ignore
 */
const nativeObjectToString = String.prototype.toString;

/**
 * @ignore
 */
const internalInvertBy = createInverter((result, value, key) => {
  if (value != null &&
    typeof value.toString != "function") {
    value = nativeObjectToString.call(value);
  }

  if (hasOwnProperty.call(result, value)) {
    result[value].push(key);
  } else {
    result[value] = [key];
  }
}, getIteratee);


/**
 * This method is like `invert` except that the inverted object is generated
 * from the results of running each element of `object` thru `iteratee`. The
 * corresponding inverted value of each inverted key is an array of keys
 * responsible for generating the inverted value. The iteratee is invoked
 * with one argument: (value).
 *
 * @since 5.11.0
 * @category Object
 * @param object The object to invert.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the new inverted object.
 * @example
 *
 * ```js
 * const object = { 'a': 1, 'b': 2, 'c': 1 }
 *
 * invertBy(object, value => `group${value}`)
 * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
 * ```
 */
export function invertBy<T = any>(
  object: Record<string, T>,
  iteratee: RecordIteratee<T, string>
): Record<string, Array<string>>;
export function invertBy(...args: any[]): any {
  return internalInvertBy(...args);
}

export default invertBy;
