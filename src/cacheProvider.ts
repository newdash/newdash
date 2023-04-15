import { LRUMap } from "./functional/LRUMap";
import { TTLMap } from "./functional/TTLMap";
import { GeneralFunction } from "./types";

export interface CachePolicy {
  cacheUndefined?: boolean;
  cacheNull?: boolean;
  cacheThrow?: boolean;
}

export interface CacheConfig<T> {
  policy?: CachePolicy;
  params?: T;
}

export type LRUCacheConfig = CacheConfig<LRUCacheProviderParam>;

export type TTLCacheConfig = CacheConfig<TTLCacheProviderParam>;

const DEFAULT_CACHE_POLICY: CachePolicy = {
  cacheUndefined: false,
  cacheNull: false,
  cacheThrow: false
};

class CachedThrowError {
  private readonly _error: Error;
  constructor(error: Error) { this._error = error; }
  getError() { return this._error; }
}

export interface CacheProvider<K, V> extends Map<K, V> {

  /**
   * get cache or create it on necessary
   *
   * @param key
   * @param producer
   */
  getOrCreate<R>(key: K, producer: GeneralFunction<any[], R>): R

}

/**
 * async cache provider
 */
export interface AsyncCacheProvider<K, V> extends CacheProvider<K, Promise<V>> { }

export interface LRUCacheProviderParam {
  maxEntry: number;
}

function defaultGetOrCreate(cache: Map<any, any>, policy: CachePolicy, key: any, producer: any) {
  if (!cache.has(key)) {
    try {
      const value = producer();
      // work with async function
      if (value instanceof Promise) {
        // @ts-ignore
        return value
          .then((result) => {
            if (
              result === null && !Boolean(policy.cacheNull) ||
              result === undefined && !Boolean(policy.cacheUndefined)
            ) {
              // do nothing
            } else {
              cache.set(key, result);
            }
            return result;
          })
          .catch((error) => {
            if (Boolean(policy.cacheThrow)) {
              cache.set(key, new CachedThrowError(error));
            }
            throw error;
          });
      }
      if (
        value === null && !Boolean(policy.cacheNull) ||
        value === undefined && !Boolean(policy.cacheUndefined)
      ) {
        // do nothing
      } else {
        cache.set(key, value);
      }
      return value;
    } catch (error) {
      if (Boolean(policy.cacheThrow)) {
        cache.set(key, new CachedThrowError(error));
      }
      throw error;
    }

  }
  const cachedValue = cache.get(key);
  if (cachedValue instanceof CachedThrowError) {
    throw cachedValue.getError();
  }
  return cachedValue;
}

/**
 * LRU Cache Provider
 *
 * @category Cache
 * @since 5.16.0
 */
export class LRUCacheProvider<K = any, V = any> extends LRUMap implements CacheProvider<K, V> {

  protected readonly _cachePolicy: CachePolicy = DEFAULT_CACHE_POLICY;

  constructor(config: CacheConfig<LRUCacheProviderParam>)
  constructor(maxEntry?: number)
  constructor(param0: any) {
    super(typeof param0 === "number" ? param0 : (param0?.params?.maxEntry ?? 10240));
    if (typeof param0 === "object") {
      this._cachePolicy = Object.assign(DEFAULT_CACHE_POLICY, param0.policy ?? {});
    }
  }

  public getOrCreate<R>(key: K, producer: GeneralFunction<any[], R>): R {
    return defaultGetOrCreate(this, this._cachePolicy, key, producer);
  }

}

export interface TTLCacheProviderParam {
  ttl?: number;
  checkInterval?: number;
  maxEntry?: number;
}

const DEFAULT_CACHE_PROVIDER_PARAM: TTLCacheProviderParam = {
  ttl: 30 * 1000,
  checkInterval: 60 * 1000,
  maxEntry: 10240
};

/**
 * TTL Cache Provider
 *
 * @since 5.16.0
 * @category Cache
 *
 */
export class TTLCacheProvider<K = any, V = any> extends TTLMap<K, V> implements CacheProvider<K, V> {

  protected readonly _cachePolicy: CachePolicy;

  constructor(config: CacheConfig<TTLCacheProviderParam>)
  constructor(ttl?: number, checkInterval?: number, maxEntry?: number)
  constructor(...params: any[]) {
    const config = {
      policy: DEFAULT_CACHE_POLICY, params: DEFAULT_CACHE_PROVIDER_PARAM
    };
    if (typeof params[0] === "number") {
      config.params.ttl = params[0] || config.params.ttl;
      config.params.checkInterval = params[1] || config.params.checkInterval;
      config.params.maxEntry = params[2] || config.params.maxEntry;
    } else {
      config.policy = Object.assign(config.policy || {}, params[0].policy || {});
      config.params = Object.assign(config.params || {}, params[0].params || {});
    }
    super(config.params.ttl);
    this._cachePolicy = config.policy;
  }

  public getOrCreate<R>(key: K, producer: GeneralFunction<any[], R>): R {
    return defaultGetOrCreate(this, this._cachePolicy, key, producer);
  }

}

export const cacheProvider = {
  LRUCacheProvider,
  TTLCacheProvider
};
