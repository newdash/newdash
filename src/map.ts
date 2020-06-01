import isArray from './isArray';
import baseMap from './.internal/baseMap';
import arrayMap from './.internal/arrayMap';
import getIteratee from './.internal/getIteratee';

/**
 * @ignore
 */
interface Iteratee<T, R, K> {
  (value?: T, key?: K): R
}

/**
 * @ignore
 */
type ArrayIteratee<T = any, R = any> = Iteratee<T, R, number>

/**
 * @ignore
 */
type ObjectIteratee<T = any, R = any> = Iteratee<T, R, string>

/**
 * @ignore
 */
type TypedObject<T> = { [key: string]: T }

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `every`, `filter`, `map`, `mapValues`, `reject`, and `some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @since 5.0.0
 * @category Collection
 * @example
 *
 * ```js
 * function square(n) {
 *   return n * n;
 * }
 *
 * map([4, 8], square);
 * // => [16, 64]
 *
 * map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * map(users, 'user');
 * // => ['barney', 'fred']
 *
 * ```
 *
 */
function map<T, R>(collection: Array<T>): T[];
function map<T, R>(collection: TypedObject<T>): T[];
function map<T, R>(collection: any): any;
function map<T, R>(collection: Array<T>, iteratee?: ArrayIteratee<T, R>): R[];
function map<T, R>(collection: TypedObject<T>, iteratee?: ObjectIteratee<T, R>): R[];
function map<T, R>(collection: any, iteratee?: any) {
  const oIteratee = getIteratee(iteratee, 3);
  if (isArray(collection)) {
    return arrayMap(collection as any, oIteratee) as R[];
  }
  return baseMap(collection as any, oIteratee) as R[];

}

export default map;
