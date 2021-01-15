import { defineFunctionName } from './defineFunctionName';

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
  before?: (ctx: WrapperContext<T, G>) => ReturnType<T> | void,
  /**
   * after runner call, change result
   */
  after?: (ctx: WrapperContext<T, G>, result: ReturnType<T>) => ReturnType<T>,
  /**
   * error raised, return the customized value or raise error
   */
  error?: (ctx: WrapperContext<T, G>, error: Error) => ReturnType<T> | void,
}

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
 */
export function createFunctionWrapper<T extends Func, G extends any>(runner: T, options: WrapperOptions<T, G>): T {

  options.after = options?.after ?? returnSame;
  options.before = options?.before ?? returnUndefined;
  // @ts-ignore
  options.global = options?.global ?? {};
  options.error = options?.error ?? throwError;


  // @ts-ignore
  return defineFunctionName((...args: Parameters<T>) => {

    const ctx: WrapperContext<T> = {
      args, global: options?.global ?? {}, runner, state: {}
    };

    try {
      const earlyValue = options.before(ctx);
      if (earlyValue !== undefined) {
        return earlyValue;
      }
      const rt = runner(...args);
      // if is async
      if (rt instanceof Promise) {
        return rt
          .then((result) => options.after(ctx, result)) // async result
          .catch((error) => options.error(ctx, error)); // async error
      }
      // if is sync
      return options.after(ctx, rt);
    } catch (error) {
      // sync error
      return options.error(ctx, error);
    }
  }, runner?.name);
}
