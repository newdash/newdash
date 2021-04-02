import { filter as syncFilter } from '../filter';
import type { AsyncFunction } from '../types';
import map from './map';

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
  const filterValues = await map(collection, predicate);
  return syncFilter(collection, (item, index) => filterValues[index]);
}
