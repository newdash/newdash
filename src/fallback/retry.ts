/* eslint-disable max-len */
import { mustProvide } from "../assert";
import { retry } from "../retry";

/**
 * fallback to retry
 *
 * @since 5.15.0
 * @category Fallback
 * @param runner async function, return promise
 * @param maxRetryNumber the maximum number of times a runner should retry, default is 3
 * @param retryAfterMSecond the wait milliseconds before retry
 */
export function fallbackRetry<T extends () => any>(runner: T, maxRetryNumber: number = 3, retryAfterMSecond?: number): T {
  mustProvide(runner, "runner", "function");
  return retry(runner, maxRetryNumber, retryAfterMSecond) as T;
}
