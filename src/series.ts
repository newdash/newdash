import { AsyncFunction, ReturnType, UnwrapPromise } from "./types";


type SeriesResult<T extends Array<AsyncFunction>> = { [K in keyof T]: UnwrapPromise<ReturnType<T[K]>> }

/**
 * run async operations one by one, serially
 *
 * and return the result array
 *
 * if any operation raise error, the following operations will not be executed
 *
 * @since 5.14.0
 * @category Async
 * @param asyncOperations async operations
 *
 *
 * @example
 *
 * ```js
 * const [res1, res2, res3] = await series(
 *    () => fetch(1),
 *    () => fetch(2),
 *    () => fetch(3)
 * )
 * ```
 */
export async function series<T extends Array<AsyncFunction>>(...asyncOperations: T): Promise<SeriesResult<T>> {
  const rt = [];
  for (const asyncOperation of asyncOperations) {
    rt.push(await asyncOperation());
  }
  return <unknown>rt as SeriesResult<T>;
}

export default series;
