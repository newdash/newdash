// @ts-nocheck
import { mustProvide } from '../assert';
import { LRUCacheProvider } from '../cacheProvider';
import defineFunctionName from '../functional/defineFunctionName';
import { toHashCode } from '../functional/toHashCode';

/**
 * @private
 * @ignore
 * @internal
 * @param error
 * @param cache
 * @param key
 */
function errorWithCache(error, cache, key) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  throw error;
}

/**
 * fallback to cache
 *
 * @since 5.15.0
 * @category Fallback
 *
 * @param runner
 * @param cacheSize the maximum number cache item (different parameters)
 */
export function fallbackCache<T>(runner: T, cacheSize: number = 1024): T {

  mustProvide(runner, 'runner', 'function');

  const funcCache = new LRUCacheProvider(cacheSize);


  const func = (...args: any[]) => {
    const argsKey = toHashCode(args);
    try {
      const rt = runner(...args);
      if (rt instanceof Promise) {
        return rt
          .then((result) => {
            funcCache.set(argsKey, result);
            return result;
          })
          .catch((error) => errorWithCache(error,funcCache,argsKey));
      }
      funcCache.set(argsKey, rt);
      return rt;
    } catch (error) {
      return errorWithCache(error,funcCache,argsKey);
    }
  };

  // overwrite proxy function name
  return defineFunctionName(func, runner.name);

}
