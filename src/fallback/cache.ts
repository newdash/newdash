// @ts-nocheck

import { toHashCode } from '../functional/toHashCode';

/**
 * fallback to cache
 *
 * @since 5.15.0
 * @category Fallback
 *
 * @param runner
 */
export function fallbackCache<T>(runner: T): T {

  const funcCache = new Map(); // replace as LRU cache later

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
