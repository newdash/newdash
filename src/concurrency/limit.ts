import { mustProvide } from "../assert";
import defineFunctionName from "../functional/defineFunctionName";
import { Semaphore } from "../functional/Semaphore";
import { AsyncFunction } from "../types";

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

  mustProvide(runner, "runner", "function");
  mustProvide(concurrencyNumber, "concurrencyNumber", "number");

  const sem = new Semaphore(concurrencyNumber);

  // @ts-ignore
  return defineFunctionName(async (...args: any[]) => {
    const release = await sem.acquire();
    try {
      return await runner(...args);
    } finally {
      release();
    }
  }, runner?.name);

}

/**
 * let async function only invoke at once in same time
 *
 * @category Async
 * @since 5.20.0
 * @param func the function to be processed
 * @returns the wrapped function instance
 */
export function synchronized<T extends AsyncFunction>(func: T): T {
  return limit(func, 1);
}

export default limit;
