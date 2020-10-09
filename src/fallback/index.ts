import { AsyncFunction } from '../types';
// @ts-nocheck
import { fallbackCache } from './cache';
import { circuit } from './circuit';
import { fallbackRetry } from './retry';


interface RecommendFallbackCreatorOptions {

  /**
   * LRUCache size for circuit & cache
   */
  cacheSize?: number;

  /**
   * circuit opening duration after failure, in milliseconds, default is 10000 (10 seconds)
   */
  circuitOpenDuration?: number;

  /**
   * retry times after failure happened, **INTEGER** please
   */
  retryMaximumTime?: number;

  /**
   * the duration between each time retry, in milliseconds
   */
  retryInterval?: number;

}

/**
 * recommend fallback policy
 *
 * cache <- circuit <- retry <- runner
 *
 * when error happened from `runner`, `retry` it firstly
 *
 * if `retry` finally failed, the `circuit breaker` will open,
 * later requests in a **duration** will not be executed, and just throw the `temp not available error`
 *
 * if the `circuit` is open, `cache` will catch the error, and try to get value from previous successful `cache`
 *
 * if there is no successful cache before, throw the original error (maybe wrapper with [[TemporaryUnAvailableError]]) directly
 *
 * @since 5.15.0
 * @category Fallback
 * @param runner
 */
export function recommend<T extends AsyncFunction>(runner: T, options: RecommendFallbackCreatorOptions = {}): T {
  return fallbackCache(
    circuit(
      fallbackRetry(
        runner,
        options.retryMaximumTime,
        options.retryInterval
      ),
      options.circuitOpenDuration,
      options.cacheSize
    ),
    options.cacheSize
  );
}

/**
 * fallback namespace
 *
 * @since 5.15.0
 */
export const fallback = {
  cache: fallbackCache,
  retry: fallbackRetry,
  circuit,
  recommend
};


