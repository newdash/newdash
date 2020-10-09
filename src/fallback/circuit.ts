// @ts-nocheck

import { toHashCode } from '../functional/toHashCode';

/**
 * TemporaryUnAvailableError
 *
 * when the circuit breaker is open (failure happened latest), will direct throw this error
 */
export class TemporaryUnAvailableError extends Error {

}

/**
 * fallback to circuit
 *
 * will directly raise error [[TemporaryUnAvailableError]] when some error happened before in duration
 *
 * @category Fallback
 * @param runner
 * @param openDuration default is 10000 (10 seconds)
 */
export function circuit<T>(runner: T, openDuration: number = 10 * 1000): T {

  if (typeof runner !== 'function') {
    throw new TypeError('must provide a function for runner');
  }

  if (typeof openDuration !== 'number') {
    throw new TypeError('must provider a number for offDuration');
  }

  if (openDuration === 0) {
    return runner;
  }

  const breakerLatestFailedTimes = new Map();

  const funcName = runner.name;

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
      throw error;
    }
  };

  // overwrite proxy function name
  Object.defineProperty(func, 'name', {
    value: funcName
  });

  return func;

}
