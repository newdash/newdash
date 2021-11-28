// @ts-nocheck
import { mustProvide } from "../assert";
import { LRUCacheProvider } from "../cacheProvider";
import { createFunctionWrapper } from "../functional/functionWrapper";
import { toHashCode } from "../functional/toHashCode";

/**
 * fallback to cache, if runner throw error, will try to return the latest cached value
 *
 * @since 5.15.0
 * @category Fallback
 *
 * @param runner
 * @param cacheSize the maximum number cache item (different parameters)
 */
export function fallbackCache<T>(runner: T, cacheSize: number = 1024): T {

  mustProvide(runner, "runner", "function");

  return createFunctionWrapper(runner, {
    global: { funcCache: new LRUCacheProvider(cacheSize) },
    before: (ctx) => {
      ctx.state.key = toHashCode(ctx.args);
    },
    after: (ctx, result) => {
      const cache = ctx.global.funcCache;
      const key = ctx.state.key;
      cache.set(key, result);
      return result;
    },
    error: (ctx, error) => {
      const cache = ctx.global.funcCache;
      const key = ctx.state.key;
      if (cache.has(key)) { return cache.get(key); }
      throw error;
    }
  });


}
