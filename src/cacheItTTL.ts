/* eslint-disable max-len */
import cacheIt, { CachedClass, CachedFunction, CachedObject, CacheItOptions } from "./cacheIt";
import { TTLCacheProvider, TTLCacheProviderParam } from "./cacheProvider";
import { Class, GeneralFunction } from "./types";

export function cacheItTTL<T extends GeneralFunction>(obj: T, options?: CacheItOptions<TTLCacheProviderParam>): CachedFunction<T>
export function cacheItTTL<T extends Class>(obj: T, options?: CacheItOptions<TTLCacheProviderParam>): CachedClass<T>
export function cacheItTTL<T extends object>(obj: T, options?: CacheItOptions<TTLCacheProviderParam>): CachedObject<T>
export function cacheItTTL(obj: any, options?: CacheItOptions<TTLCacheProviderParam>): any
export function cacheItTTL(obj: any, options: any = {}) {
  const opt: CacheItOptions = Object.assign({}, { provider: TTLCacheProvider }, options);
  return cacheIt(obj, opt);
}

