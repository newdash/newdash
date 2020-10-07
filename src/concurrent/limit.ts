// @ts-nocheck
import { AsyncFunction } from '../types';
import { Semaphore } from './semaphore';

/**
 * limit concurrent for parallel operations
 *
 * @category async
 * @since 5.15.0
 * @param runner async operation function
 * @param concurrencyNumber max concurrency number
 *
 * @returns the concurrency limited function wrapper
 *
 */
export function limit<T extends AsyncFunction>(runner: T, concurrencyNumber: number): T {
  if (runner === undefined) {
    return undefined;
  }
  if (concurrencyNumber === undefined || concurrencyNumber < 1) {
    return runner;
  }

  const sem = new Semaphore(concurrencyNumber);

  return async (...args: any[]) => {
    await sem.acquire();
    return runner(...args);
  };

}

export default limit;
