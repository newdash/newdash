import findLastIndex from './findLastIndex';
import createFind from './.internal/createFind';

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
 * @see find,findIndex,findKey,findLastIndex,findLastKey
 * @example
 *
 *
 * ```js
 * findLast([1, 2, 3, 4], n => n % 2 == 1)
 * // => 3
 * ```
 *
 */
const findLast = createFind(findLastIndex);

export default findLast;
