import sleep from './sleep';


/**
 * make function retry-able
 *
 * e.g. if `maxRetryCount` is 3, it will run 4 times most, and return the final error.
 *
 * @since 5.14.0
 * @category Async
 * @param runner async function, return promise
 * @param maxRetryCount the maximum number of times a runner should retry, default is 3
 * @param retryAfterMSecond the wait milliseconds before retry
 */
export function retry<E, T extends(...args: any[]) => Promise<E>>(runner: T, maxRetryCount = 3,retryAfterMSecond = 0): (...args: Parameters<T>) => Promise<E> {
  if (typeof runner !=='function') {
    throw new TypeError('must provide a function for "retry"');
  }

  if (maxRetryCount > 1) {
    return async function(...args: any[]) {
      for (let idx = 0; idx < (maxRetryCount-1); idx++) {
        try {
          return await runner(...args);
        } catch (error) {
          // ignore error
        }
        if (retryAfterMSecond > 0) {
          await sleep(retryAfterMSecond);
        }
      }
      return await runner(...args);
    };
  }

  return runner;

}


export default retry;
