/* eslint-disable max-len */
import { mustProvide } from "../assert";
import { LRUCacheProvider } from "../cacheProvider";
import { createFunctionWrapper } from "../functional/functionWrapper";
import { toHashCode } from "../functional/toHashCode";
import { GeneralFunction } from "../types";

/**
 * TemporaryUnAvailableError
 *
 * when the circuit breaker is open (failure happened latest), will direct throw this error
 *
 * @internal please do not throw this error outside of newdash inner functions
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
  if (!(error instanceof TemporaryUnAvailableError)) {
    breakerOpenTimers.set(
      key,
      Date.now()
    );
    breakerOpenReason.set(
      key,
      error
    );
  }
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
export function circuit<T extends GeneralFunction>(runner: T, openDuration: number = 10 * 1000, cacheSize: number = 1024): T {

  mustProvide(runner, "runner", "function");
  mustProvide(openDuration, "openDuration", "number");

  if (openDuration === 0) { return runner; }

  const funcName = runner["name"] || "Unknown";

  return createFunctionWrapper(runner, {
    global: {
      breakerOpenTimers: new LRUCacheProvider(cacheSize),
      breakerOpenReason: new LRUCacheProvider(cacheSize),
    },
    before: (ctx) => {
      ctx.state.key = toHashCode(ctx.args);
      const latestFailedTime = ctx.global.breakerOpenTimers.get(ctx.state.key) ?? 0;
      const availableTime = latestFailedTime + openDuration;
      if (availableTime > Date.now()) {
        throw new TemporaryUnAvailableError(
          `function [${funcName}] is temporary un-available until ${availableTime}`,
          ctx.global.breakerOpenReason.get(ctx.state.key)
        );
      }

    },
    error: (ctx, error) => errorWithCircuit(
      error,
      ctx.state.key,
      ctx.global.breakerOpenTimers,
      ctx.global.breakerOpenReason
    ),
  });
}
