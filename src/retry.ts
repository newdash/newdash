import { mustProvide } from "./assert";
import defineFunctionName from "./functional/defineFunctionName";
import sleep from "./sleep";


/**
 * @ignore
 * @internal
 * @private
 */
interface RContext {
  runner: any;
  args: any[];
  retryCount: number;
  maxTimeRetry: number;
  retryAfterMSecond: number;
  isAsync: boolean;
}

/**
 * @ignore
 * @internal
 * @private
 * @param error
 * @param ctx
 */
function errorWithRetry(error: Error, ctx: RContext) {
  if (ctx.retryCount < ctx.maxTimeRetry) {
    ctx.retryCount++;
    if (ctx.isAsync && ctx.retryAfterMSecond > 0) {
      return sleep(ctx.retryAfterMSecond).then(() => runWithRetryLimit(ctx));
    }
    return runWithRetryLimit(ctx);
  }
  throw error;
}

/**
 * @ignore
 * @internal
 * @private
 * @param ctx
 */
function runWithRetryLimit(ctx: RContext) {
  const { runner, args } = ctx;

  try {

    const rt = runner(...args);
    if (rt instanceof Promise) {
      ctx.isAsync = true;
      return rt.catch(
        (error) => errorWithRetry(error, ctx)
      );
    }
    return rt;

  }
  catch (error) {
    return errorWithRetry(error, ctx);
  }

}

/**
 * make function retry-able
 *
 * e.g. if `maxRetryCount` is 3, it will run 3 times at most (include the first one), and return the final error.
 *
 * @since 5.14.0
 * @category Async
 * @param runner async function, return promise
 * @param maxRetryCount the maximum number of times a runner should retry, default is 3
 * @param retryAfterMSecond (async function required, for sync function, this parameter will not be applied) the wait milliseconds before retry, default is zero
 */
export function retry<T>(runner: T, maxRetryCount = 3, retryAfterMSecond = 0): T {
  mustProvide(runner, "runner", "function");

  if (maxRetryCount > 1) {
    const func = function (...args: any[]) {
      const ctx: RContext = {
        runner,
        retryCount: 1,
        args,
        retryAfterMSecond,
        maxTimeRetry: maxRetryCount,
        isAsync: false
      };
      return runWithRetryLimit(ctx);
    };
    // copy original function name
    // @ts-ignore
    return defineFunctionName(func, runner.name);
  }

  // @ts-ignore
  return runner;

}


export default retry;
