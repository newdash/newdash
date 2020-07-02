import isArray from './isArray';
import baseMap from './.internal/baseMap';
import arrayMap from './.internal/arrayMap';
import getIteratee from './.internal/getIteratee';
import { Collection, CollectionIteratee, Tuple } from './types';


/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratee for methods like
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
export function map<T extends any[] | []>(collection: T): Tuple<T>;
export function map<T>(collection: Record<string, T>): T[];
export function map<T, R>(collection: Collection<T>, iteratee: CollectionIteratee<T, R>): R[];
export function map(collection: any, iteratee?: any): [];
export function map(collection: any, iteratee?: any) {

  const oIteratee = getIteratee(iteratee, 3);
  if (isArray(collection)) {
    return arrayMap(collection as any, oIteratee);
  }
  return baseMap(collection as any, oIteratee);

}

export default map;
