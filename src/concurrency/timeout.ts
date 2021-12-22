import { mustProvide } from "../assert";
import defineFunctionName from "../functional/defineFunctionName";
import { createTimeoutPromise } from "../timeout";
import { AsyncFunction } from "../types";

/**
 * wrap an async function with timeout
 *
 * @since 5.15.0
 * @category Async
 *
 * @param runner async runner please, otherwise the `timeout` is not meaningful
 * @param timeout timeout threshold in milliseconds, default value is 60 seconds
 *
 * @throws {TimeoutError}
 *
 * @example
 *
 * ```ts
 * const f = timeout(async() => {}, 1000)
 * // f() will throw error if the result is not resolved in one second
 * ```
 *
 */
export function timeout<T extends AsyncFunction>(runner: T, timeout: number = 60 * 1000): T {

  mustProvide(runner, "runner", "function");
  mustProvide(timeout, "timeout", "number");

  const func = (...args: any[]) => createTimeoutPromise(async (resolve, reject) => {
    try {
      resolve(await runner(...args));
    } catch (error) {
      reject(error);
    }
  }, timeout);

  // @ts-ignore
  return defineFunctionName(func, runner.name);

}

export default timeout;
