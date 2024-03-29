import { map as syncMap } from "../map";
import type { ArrayIteratee, RecordIteratee, Tuple } from "../types";


/**
 *
 * AsyncUtils.map, mapping values with async iteratee functions
 *
 * @author Theo Sun
 * @since 5.18.0
 * @category Async
 * @param collection
 */
export async function map<T extends any[] | []>(collection: T): Promise<Tuple<T>>;
export async function map<T, R = any>(
  collection: ArrayLike<T>,
  iteratee?: ArrayIteratee<T, Promise<R>>
): Promise<Array<R>>;
export async function map<T, R = any>(
  collection: Record<string, T>,
  iteratee?: RecordIteratee<T, Promise<R>>
): Promise<Array<R>>;
export async function map(collection: any, iteratee?: any): Promise<Array<any>>;
export async function map(collection: any, iteratee?: any) {
  if (iteratee === undefined) {
    return syncMap(collection);
  }
  const results = await Promise.all(syncMap(collection, iteratee));
  return syncMap(results, (result) => result ?? undefined);
}


export default map;
