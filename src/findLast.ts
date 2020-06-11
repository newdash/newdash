import findLastIndex from './findLastIndex';
import createFind from './.internal/createFind';

/**
 * @ignore
 */
const internalFind = createFind(findLastIndex);

/**
 * This method is like `find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 5.2.0
 * @category Collection
 * @param collection The collection to inspect.
 * @param predicate The function invoked per iteration.
 * @param fromIndex The index to search from.
 * @returns Returns the matched element, else `undefined`.
 * @see [[find]],[[findIndex]],[[findKey]],[[findLastIndex]],[[findLastKey]]
 * @example
 *
 *
 * ```js
 * findLast([1, 2, 3, 4], n => n % 2 == 1)
 * // => 3
 * ```
 *
 */
export function findLast<T>(collection: ArrayLike<T>, predicate?: string, fromIndex?: number): T | undefined;
export function findLast<T>(collection: ArrayLike<T>, predicate?: (item: T) => boolean, fromIndex?: number): T | undefined;
export function findLast<T>(collection: ArrayLike<T>, predicate?: Partial<T>, fromIndex?: number): T | undefined;
export function findLast<T>(collection: ArrayLike<T>, predicate?: any, fromIndex?: number): T | undefined;
export function findLast(collection: any, predicate?: any, fromIndex?: any): any {
  return internalFind(collection, predicate, fromIndex);
}

export default findLast;
