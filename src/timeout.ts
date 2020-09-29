
type Executor<T> = (resolve: (value?: T | PromiseLike<T>) => void, reject?: (reason?: any) => void) => void

export class TimeoutError extends Error { }

/**
 * create a promise with timeout, if time is up but no result/error resolved by promise, will throw an error
 *
 * @param executor the promise executor
 * @param timeout the timeout in milliseconds, e.g. 10000 means 10 seconds, and default value is 10 seconds
 *
 * @category Async
 * @since 5.14.0
 * @throws {TimeoutError}
 */
export function createTimeoutPromise<T>(executor: Executor<T>, timeout = 10 * 1000): Promise<T> {

  return new Promise((resolve, reject) => {
    let hasTimeout = false;
    let hasProcess = false;
    setTimeout(() => { if (!hasProcess) { hasTimeout = true; reject(new TimeoutError('Timeout')); } }, timeout);
    executor(
      (...args: any[]) => {
        if (!hasTimeout) {
          hasProcess = true;
          resolve(...args);
        }
      },
      (...args: any[]) => {
        if (!hasTimeout) {
          hasProcess = true;
          reject(...args);
        }
      });
  });

}
