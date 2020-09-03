import { AsyncFunction, ReturnType, UnwrapPromise } from './types';


type SeriesResult<T extends Array<AsyncFunction>> = Promise<{ [K in keyof T]: UnwrapPromise<ReturnType<T[K]>> }>

export async function series<T extends Array<AsyncFunction>>(...asyncOperations: T): SeriesResult<T> {
  const rt = [];
  for (const asyncOperation of asyncOperations) {
    rt.push(await asyncOperation());
  }
  return <unknown>rt as SeriesResult<T>;
}
