// @ts-nocheck
import { mustProvide } from '../assert';
import { LRUCache } from '../functional/LRUCache';
import { toHashCode } from '../functional/toHashCode';

/**
 * TemporaryUnAvailableError
 *
 * when the circuit breaker is open (failure happened latest), will direct throw this error
 */
export class TemporaryUnAvailableError extends Error {

  /**
   * the error cause the function temporary not available
   */
  causeError: Error;

  constructor(msg: string, causeError?: Error) {
    if (causeError !== undefined) {
      super(`${msg} cause error message(${causeError.message})`);
    } else {
      super(msg);
    }
    this.causeError = causeError;
  }

}

/**
 * fallback to circuit
 *
 * will directly raise error [[TemporaryUnAvailableError]] when some error happened before in duration
 *
 * @category Fallback
 * @param runner
 * @param openDuration default is 10000 (10 seconds)
 * @param cacheSize the timer & error cache size, default is 1024
 */
export function circuit<T>(runner: T, openDuration: number = 10 * 1000, cacheSize: number = 1024): T {

  mustProvide(runner, 'runner', 'function');
  mustProvide(openDuration, 'openDuration', 'number');

  if (openDuration === 0) { return runner; }

  const breakerLatestFailedTimes = new LRUCache(cacheSize);
  const breakerLatestError = new LRUCache(cacheSize);

  const funcName = runner.name || 'Unknown';

  const func = async (...args: any[]) => {
    const paramKey = toHashCode(args);
    const latestFailedTime = breakerLatestFailedTimes.get(paramKey) ?? 0;
    const availableTime = latestFailedTime + openDuration;
    if (availableTime > new Date().getTime()) {
      throw new TemporaryUnAvailableError(`function [${funcName}] is temporary un-available until ${availableTime}`);
    }
    try {
      return await runner(...args);
    } catch (error) {
      breakerLatestFailedTimes.set(paramKey, new Date().getTime());
      breakerLatestError.set(
        paramKey,
        new TemporaryUnAvailableError(
          `function [${funcName}] is temporary un-available until ${availableTime}`,
          error
        )
      );
      throw error;
    }
  };

  // overwrite proxy function name
  Object.defineProperty(func, 'name', {
    value: funcName
  });

  return func;

}
