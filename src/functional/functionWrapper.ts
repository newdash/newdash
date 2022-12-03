/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-arrow-callback */
import { isAsyncFunction } from "../isAsyncFunction";
import { defineFunctionName } from "./defineFunctionName";

/**
 * @internal
 * @ignore
 * @private
 */
type Func = (...args: any[]) => any

/**
 * @internal
 * @ignore
 * @private
 */
interface WrapperContext<T extends Func, G = any> {
  global: G;
  args: Parameters<T>;
  runner: T;
  state: any;
  thisContext?: any;
}

/**
 * @internal
 * @ignore
 * @private
 */
interface WrapperOptions<T extends Func, G = any> {
  /**
   * global state of the function instance
   */
  global?: G,
  /**
   * before runner call, return a value to skip execute runner
   */
  before?: (ctx: WrapperContext<T, G>) => any,

  /**
   * overwrite function execution
   *
   * @since 5.19.0
   */
  execute?: (ctx: WrapperContext<T, G>) => ReturnType<T>,

  /**
   * after runner call, change result
   */
  after?: (ctx: WrapperContext<T, G>, result: ReturnType<T>) => any,
  /**
   * error raised, return the customized value or raise error
   */
  error?: (ctx: WrapperContext<T, G>, error: Error) => any,
  /**
   * force binding 'this' context to target
   * @since 5.19.0
   */
  thisContext?: any,
}

/**
 * @internal
 * @private
 * @ignore
 * @param ctx
 * @returns
 */
const defaultExecute = (ctx: WrapperContext<any, any>) => ctx.runner(...ctx.args);

/**
 * @internal
 * @ignore
 * @private
 * @param ctx
 * @param result
 */
const returnSame = (ctx: any, result: any) => result;

/**
 * @internal
 * @ignore
 * @private
 */
const returnUndefined = (ctx: any) => undefined;
/**
 *
 * @internal
 * @ignore
 * @private
 */
const throwError = (ctx: any, err: Error) => { throw err; };

/**
 *
 * create function wrapper for sync/async function
 *
 * @category Functional
 * @since 5.18.0
 * @param runner
 * @param options
 *
 */
export function createFunctionWrapper<T extends Func, G extends any>(runner: T, options: WrapperOptions<T, G>): T & { __wrap_global__: G } {

  /**
   * runner is async function or not
   */
  const isAsync = isAsyncFunction(runner);

  // return runner direct if no logic
  if (
    options.before === undefined
    && options.error === undefined
    && options.execute === undefined
    && options.after === undefined
  ) {
    return runner as any;
  }

  options.after = options?.after ?? returnSame;
  options.before = options?.before ?? returnUndefined;
  options.execute = options?.execute ?? defaultExecute;
  // @ts-ignore
  options.global = options?.global ?? {};
  options.error = options?.error ?? throwError;

  const thisContext = options.thisContext ?? this;

  const warpRunner = function (...args: Parameters<T>) {
    const ctx: WrapperContext<T> = {
      args,
      global: { ...(options?.global ?? {}) },
      runner,
      state: {},
      thisContext,
    };

    try {
      const earlyValue = options.before.call(thisContext, ctx);
      if (earlyValue !== undefined) {
        return earlyValue;
      }
      const rt = options.execute.call(thisContext, ctx);
      // if return promise
      // @ts-ignore
      if (rt instanceof Promise) {
        return rt
          .then((result) => options.after.call(thisContext, ctx, result)) // async result
          .catch((error) => options.error.call(thisContext, ctx, error)); // async error
      }
      // else
      return options.after.call(thisContext, ctx, rt);
    } catch (error) {
      // sync error
      return options.error.call(thisContext, ctx, error);
    }
  };


  if (isAsync) {
    // if runner is async function, keep the warped function still an 'AsyncFunction'
    const asyncWarpRunner = async function (...args: Parameters<T>) {
      return warpRunner(...args);
    };

    Object.assign(asyncWarpRunner, { __wrap_global__: options.global });
    return defineFunctionName(asyncWarpRunner, runner?.name) as any;
  }

  Object.assign(warpRunner, { __wrap_global__: options.global });
  return defineFunctionName(warpRunner, runner?.name) as any;
}
