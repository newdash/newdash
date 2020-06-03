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
type Tuple<T> = { [K in keyof T]: T[K] };

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
function map<T extends any[] | []>(collection: T): Tuple<T>;
function map<T>(collection: Record<string, T>): T[];
function map<T, R>(collection: Array<T>, iteratee?: ArrayIteratee<T, R>): R[];
function map<T, R>(collection: Record<string, T>, iteratee?: ObjectIteratee<T, R>): R[];
function map(collection: any, iteratee?: any): [];
function map(collection: any, iteratee?: any) {

  const oIteratee = getIteratee(iteratee, 3);
  if (isArray(collection)) {
    return arrayMap(collection as any, oIteratee);
  }
  return baseMap(collection as any, oIteratee);

}

export default map;
