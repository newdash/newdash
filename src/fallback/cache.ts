// @ts-nocheck
import { mustProvide } from '../assert';
import { LRUCache } from '../functional/LRUCache';
import { toHashCode } from '../functional/toHashCode';

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

  const funcCache = new LRUCache(cacheSize); // replace as LRU cache later

  const func = async (...args: any[]) => {
    const argsKey = toHashCode(args);
    try {
      const rt = await runner(...args);
      funcCache.set(argsKey, rt);
      return rt;
    } catch (error) {
      if (funcCache.has(argsKey)) {
        return funcCache.get(argsKey);
      }
      // not found cache, raise error
      throw error;
    }
  };


  // overwrite proxy function name
  Object.defineProperty(func, 'name', {
    value: runner.name
  });

  return func;

}
