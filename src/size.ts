import getTag from './.internal/getTag';
import isArrayLike from './isArrayLike';
import isString from './isString';
import stringSize from './.internal/stringSize';

/**
 * `Object#toString` result references.
 * @ignore
 */
const mapTag = '[object Map]';
/**
 * @ignore
 */
const setTag = '[object Set]';

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @since 5.7.0
 * @category Collection
 * @param collection The collection to inspect.
 * @returns Returns the collection size.
 * @example
 *
 * ```js
 * size([1, 2, 3])
 * // => 3
 *
 * size({ 'a': 1, 'b': 2 })
 * // => 2
 *
 * size('pebbles')
 * // => 7
 * ```
 */
function size(collection: string): number;
function size(collection: ArrayLike<any>): number;
function size(collection: Record<string, any>): number;
function size(collection: any): number;
function size(collection: any): any {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length;
  }
  const tag = getTag(collection);
  if (tag == mapTag || tag == setTag) {
    return collection.size;
  }
  return Object.keys(collection).length;
}

export default size;
