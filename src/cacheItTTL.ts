import cacheIt, { CachedClass, CachedFunction, CachedObject, CacheItOptions } from './cacheIt';
import { TTLCacheProvider } from './cacheProvider';
import { Class, GeneralFunction } from './types';

export function cacheItTTL<T extends GeneralFunction>(obj: T, options?: CacheItOptions): CachedFunction<T>
export function cacheItTTL<T>(obj: Class<T>, options?: CacheItOptions): CachedClass<T>
export function cacheItTTL<T extends object>(obj: T, options?: CacheItOptions): CachedObject<T>
export function cacheItTTL(obj: any, options?: CacheItOptions): any
export function cacheItTTL(obj: any, options: any = {}) {
  const opt: CacheItOptions = Object.assign({}, { provider: TTLCacheProvider }, options);
  return cacheIt(obj, opt);
}

