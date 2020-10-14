// @ts-nocheck
import { mustProvide } from '../assert';
import { LRUCacheProvider } from '../cacheProvider';
import defineFunctionName from '../functional/defineFunctionName';
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
 *
 * @ignore
 * @private
 * @internal
 * @param error
 * @param key
 * @param breakerOpenTimers
 * @param breakerOpenReason
 */
function errorWithCircuit(error: Error, key: string, breakerOpenTimers, breakerOpenReason) {
  breakerOpenTimers.set(
    key,
    new Date().getTime()
  );
  breakerOpenReason.set(
    key,
    error
  );
  throw error;
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

  const breakerOpenTimers = new LRUCacheProvider(cacheSize);
  const breakerOpenReason = new LRUCacheProvider(cacheSize);

  const funcName = runner.name || 'Unknown';

  const func = async (...args: any[]) => {

    const paramKey = toHashCode(args);
    const latestFailedTime = breakerOpenTimers.get(paramKey) ?? 0;
    const availableTime = latestFailedTime + openDuration;
    if (availableTime > new Date().getTime()) {
      throw new TemporaryUnAvailableError(
        `function [${funcName}] is temporary un-available until ${availableTime}`,
        breakerOpenReason.get(paramKey)
      );
    }

    try {
      const rt = runner(...args);
      if (rt instanceof Promise) {
        return rt.catch((error) => errorWithCircuit(error, paramKey, breakerOpenTimers, breakerOpenReason));
      }
      return rt;
    } catch (error) {
      errorWithCircuit(error, paramKey, breakerOpenTimers, breakerOpenReason);
    }
  };

  // overwrite proxy function name
  return defineFunctionName(func, funcName);

}
