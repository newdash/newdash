import { mustProvide } from '../assert';
import { Semaphore } from '../functional/Semaphore';
import { AsyncFunction } from '../types';

/**
 * limit concurrent for parallel operations
 *
 * @category Async
 * @since 5.15.0
 * @param runner async operation function
 * @param concurrencyNumber max concurrency number
 *
 * @returns the concurrency limited function wrapper
 *
 */
export function limit<T extends AsyncFunction>(runner: T, concurrencyNumber: number): T {

  mustProvide(runner, 'runner', 'function');
  mustProvide(concurrencyNumber, 'concurrencyNumber', 'number');

  const sem = new Semaphore(concurrencyNumber);

  // @ts-ignore
  return async (...args: any[]) => {
    const release = await sem.acquire();
    try {
      return await runner(...args);
    } finally {
      release();
    }
  };

}

export default limit;
