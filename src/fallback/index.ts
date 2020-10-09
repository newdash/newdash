import { AsyncFunction } from '../types';
// @ts-nocheck
import { fallbackCache } from './cache';
import { circuit } from './circuit';
import { fallbackRetry } from './retry';


/**
 * recommend fallback policy
 *
 * cache <- circuit <- retry
 *
 * when error happened, `retry` firstly
 *
 * if `retry` finally failed, the `circuit` will open, later request in a **duration** will not be executed
 *
 * if the `circuit` is open, will try to get value from previous successful `cache`
 *
 * if there is no successful cache before, throw error directly
 *
 * @since 5.15.0
 * @category Fallback
 * @param runner
 */
export function recommend<T extends AsyncFunction>(runner: T): T {
  return fallbackCache(circuit(fallbackRetry(runner)));
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


