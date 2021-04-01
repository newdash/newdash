import { filter as commonFilter } from '../filter';
import map from '../map';
import type { AsyncFunction } from '../types';

/**
 * AsyncUtils.filter, filter values by async predicate function
 *
 * @author Theo Sun
 * @since 5.18.0
 * @category Async
 * @param collection
 * @param predicate async predicate
 * @returns
 */
export async function filter<T extends any>(collection: Array<T>, predicate: AsyncFunction<[T, any, any], boolean>) {
  const filterValues = await Promise.all(map(collection, predicate));
  return commonFilter(collection, (item, index) => filterValues[index]);
}
