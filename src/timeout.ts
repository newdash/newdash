import { mustProvide } from "./assert";
import type { PromiseExecutor } from "./types";

/**
 * TimeoutError
 *
 * raised when the function is not processed finished in a limit period
 */
export class TimeoutError extends Error { }

/**
 * create a promise with timeout, if time is up but no result/error resolved by promise, will throw an error
 *
 * @param executor the promise executor
 * @param timeout the timeout in milliseconds, e.g. 10000 means 10 seconds, and default value is 60 seconds
 *
 * @category Async
 * @since 5.14.0
 *
 * @throws {TimeoutError}
 */
export function createTimeoutPromise<T>(executor: PromiseExecutor<T>, timeout = 60 * 1000): Promise<T> {

  mustProvide(executor, "executor", "function");

  return new Promise((resolve, reject) => {

    let hasTimeout = false;

    const timer = setTimeout(() => {
      hasTimeout = true;
      reject(new TimeoutError("Time is up."));
    }, timeout);

    executor(
      (value) => {
        if (!hasTimeout) {
          clearInterval(timer);
          resolve(value);
        }
      },
      (error) => {
        if (!hasTimeout) {
          clearInterval(timer);
          reject(error);
        }
      });
  });

}

export const timeout = createTimeoutPromise;


export default timeout;
