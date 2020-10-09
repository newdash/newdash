// @ts-nocheck
import { mustProvide } from '../assert';
import { retry } from '../retry';

/**
 * fallback to retry
 *
 * @since 5.15.0
 * @category Fallback
 * @param runner async function, return promise
 * @param maxRetryCount the maximum number of times a runner should retry, default is 3
 * @param retryAfterMSecond the wait milliseconds before retry
 */
export function fallbackRetry<T>(runner: T, retryTime: number = 3, retryAfterSeconds?: number): T {
  mustProvide(runner, 'runner', 'function');
  return retry(runner, retryTime, retryAfterSeconds);
}
