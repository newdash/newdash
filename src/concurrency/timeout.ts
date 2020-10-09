// @ts-nocheck
import { createTimeoutPromise } from '../timeout';

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
export function timeout<T>(runner: T, timeout?: number): T {

  const func = (...args: any[]) => createTimeoutPromise(async (resolve, reject) => {
    try {
      resolve(await runner(...args));
    } catch (error) {
      reject(error);
    }
  }, timeout);

  return func;

}
