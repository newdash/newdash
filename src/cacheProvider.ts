import { LRUMap } from './functional/LRUMap';
import { GeneralFunction } from './types';

export interface CachePolicy {
  cacheUndefined?: boolean;
  cacheNull?: boolean;
  cacheThrow?: boolean;
}

export interface CacheConfig<T> {
  policy?: CachePolicy;
  params?: T;
}


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

interface LRUCacheProviderParam {
  maxEntry: number;
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
    super(typeof param0 === 'number' ? param0 : (param0?.params?.maxEntry ?? 10240));
    if (typeof param0 === 'object') {
      this._cachePolicy = Object.assign(DEFAULT_CACHE_POLICY, param0.policy ?? {});
    }
  }


  public getOrCreate<R>(key: K, producer: GeneralFunction<any[], R>): R {
    if (!this.has(key)) {
      try {
        const value = producer();
        // work with async function
        if (value instanceof Promise) {
          // @ts-ignore
          return value
            .then((result) => {
              if (
                result === null && !Boolean(this._cachePolicy.cacheNull) ||
                result === undefined && !Boolean(this._cachePolicy.cacheUndefined)
              ) {
                // do nothing
              } else {
                this.set(key, result);
              }
              return result;
            })
            .catch((error) => {
              if (Boolean(this._cachePolicy.cacheThrow)) {
                this.set(key, new CachedThrowError(error));
              }
              throw error;
            });
        }
        if (
          value === null && !Boolean(this._cachePolicy.cacheNull) ||
          value === undefined && !Boolean(this._cachePolicy.cacheUndefined)
        ) {
          // do nothing
        } else {
          this.set(key, value);
        }
        return value;
      } catch (error) {
        if (Boolean(this._cachePolicy.cacheThrow)) {
          this.set(key, new CachedThrowError(error));
        }
        throw error;
      }

    }
    const cachedValue = this.get(key);
    if (cachedValue instanceof CachedThrowError) {
      throw cachedValue.getError();
    }
    return cachedValue;
  }


}

interface TTLCacheProviderParam {
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
export class TTLCacheProvider<K = any, V = any> extends LRUCacheProvider<K, V> {

  constructor(config: CacheConfig<TTLCacheProviderParam>)
  constructor(ttl?: number, checkInterval?: number, maxEntry?: number)
  constructor(...params: any[]) {
    super(params[0]);
    const config = {
      policy: DEFAULT_CACHE_POLICY, params: DEFAULT_CACHE_PROVIDER_PARAM
    };
    if (typeof params[0] === 'number') {
      config.params.ttl = params[0] || config.params.ttl;
      config.params.checkInterval = params[1] || config.params.checkInterval;
      config.params.maxEntry = params[2] || config.params.maxEntry;
    } else {
      config.policy = Object.assign(config.policy || {}, params[0].policy || {});
      config.params = Object.assign(config.policy || {}, params[0].params || {});
    }
    this.ttl = config.params.ttl;
    this.checkInterval = config.params.checkInterval;
    this.timeoutStorage = new LRUCacheProvider(config.params.maxEntry);
  }

  private timestamp() {
    return new Date().getTime();
  }

  set(k: K, v: V) {
    this.schedule();
    super.set(k, v);
    this.timeoutStorage.set(k, this.timestamp() + this.ttl);
    return this;
  }

  has(k: K) {
    if (super.has(k)) {
      const isTimeout = this.checkTimeout(k);
      if (isTimeout) {
        return false;
      }
      return true;
    }
    return false;
  }

  get(k: K) {
    if (super.has(k)) {
      const isTimeout = this.checkTimeout(k);
      if (isTimeout) {
        return undefined;
      }
      return super.get(k);
    }
    return undefined;
  }

  /**
   * return true if timeout
   *
   * @param k
   */
  private checkTimeout(k: K, currentTimeStamp = this.timestamp()) {
    const isTimeout = this.getTimeout(k) < currentTimeStamp;
    if (isTimeout) {
      this.delete(k);
    }
    return isTimeout;
  }

  private getTimeout(k: K) {
    if (this.timeoutStorage.has(k)) {
      return this.timeoutStorage.get(k);
    }
    return 0;
  }

  delete(k: K) {
    this.schedule();
    const rt = super.delete(k);
    this.timeoutStorage.delete(k);
    return rt;
  }

  /**
   * schedule job to clear all timeout items
   */
  private schedule() {
    if (this.timer === undefined) {
      this.timer = setInterval(() => {
        try {
          this.checkTimeoutAll();
        } catch (error) {
          // do nothing
        }
      }, this.checkInterval);
    }
  }

  private checkTimeoutAll() {
    const current = this.timestamp();
    super.forEach((_, key) => { this.checkTimeout(key, current); });
  }

  entries() {
    this.checkTimeoutAll();
    return super.entries();
  }

  keys() {
    this.checkTimeoutAll();
    return super.keys();
  }

  values() {
    this.checkTimeoutAll();
    return super.values();
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    this.checkTimeoutAll();
    return super.forEach(callbackfn, thisArg);
  }

  clear() {
    super.clear();
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      delete this.timer;
    }
  }

  private ttl: number;

  private checkInterval: number;

  private timer: any;

  private timeoutStorage: LRUCacheProvider;


}

export const cacheProvider = {
  LRUCacheProvider,
  TTLCacheProvider
};
