import { mustProvide } from '../assert';
import { createTimeoutPromise } from '../timeout';
import { AsyncFunction } from '../types';

/**
 * wrap an async function with timeout
 *
 * @since 5.15.0
 * @category Async
 *
 * @param runner
 * @param timeout
 *
 * @throws {TimeoutError}
 *
 */
export function timeout<T extends AsyncFunction>(runner: T, timeout?: number): T {

  mustProvide(runner, 'runner', 'function');
  mustProvide(timeout, 'timeout', 'number');

  const func = (...args: any[]) => createTimeoutPromise(async (resolve, reject) => {
    try {
      resolve(await runner(...args));
    } catch (error) {
      reject(error);
    }
  }, timeout);

  // @ts-ignore
  return func;

}
