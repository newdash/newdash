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
 * @param timeout timeout threshold in milliseconds
 *
 * @throws {TimeoutError}
 *
 */
export function timeout<T extends AsyncFunction>(runner: T, timeout?: number): T {

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
