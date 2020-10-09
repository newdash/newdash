import { fallbackCache } from './cache';
import { circuit } from './circuit';
import { fallbackRetry } from './retry';

/**
 * fallback namespace
 *
 * @since 5.15.0
 */
export const fallback = {
  cache: fallbackCache,
  retry: fallbackRetry,
  circuit
};


