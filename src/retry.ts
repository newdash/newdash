
/**
 * make function retry-able
 *
 * e.g. if `maxRetryCount` is 3, it will run 4 times most, and return the final error.
 *
 * @since 5.14.0
 * @category async
 * @param runner async function, return promise
 * @param maxRetryCount the maximum number of times a runner should retry, default is 3
 */
export function retry<E, T extends(...args: any[]) => Promise<E>>(runner: T, maxRetryCount = 3): (...args: Parameters<T>) => Promise<E> {

  return async function(...args: any[]) {
    if (maxRetryCount >= 1) {

      for (let idx = 0; idx < maxRetryCount; idx++) {
        try {
          return await runner(...args);
        } catch (error) {
          // ignore error
        }
      }

    }

    return await runner(...args);
  };

}


export default retry;
