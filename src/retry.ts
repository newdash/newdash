import { mustProvide } from './assert';
import defineFunctionName from './functional/defineFunctionName';
import sleep from './sleep';


/**
 * make function retry-able
 *
 * e.g. if `maxRetryCount` is 3, it will run 3 times at most (include the first one), and return the final error.
 *
 * @since 5.14.0
 * @category Async
 * @param runner async function, return promise
 * @param maxRetryCount the maximum number of times a runner should retry, default is 3
 * @param retryAfterMSecond the wait milliseconds before retry, default is zero
 */
export function retry<E, T extends (...args: any[]) => Promise<E>>(runner: T, maxRetryCount = 3, retryAfterMSecond = 0): (...args: Parameters<T>) => Promise<E> {
  mustProvide(runner, 'runner', 'function');

  if (maxRetryCount > 1) {
    const func = async function (...args: any[]) {
      for (let idx = 0; idx < (maxRetryCount - 1); idx++) {
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
    // copy original function name
    return defineFunctionName(func, runner.name);
  }

  return runner;

}


export default retry;
