import { LRUMap } from './functional/LRUMap';
import { GeneralFunction } from './types';


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
 * LRU Cache Provider
 *
 * @category Cache
 * @since 5.16.0
 */
export class LRUCacheProvider<K = any, V = any> extends LRUMap implements CacheProvider<K, V> {

  public getOrCreate<R>(key: K, producer: GeneralFunction<[], R>): R {
    if (!this.has(key)) {
      const value = producer();
      // work with async function
      if (value instanceof Promise) {
        // @ts-ignore
        return value.then((result) => {
          this.set(key, result);
          return result;
        });
      }
      this.set(key, value);
    }
    return this.get(key);
  }


}

/**
 * TTL Cache Provider
 *
 * @since 5.16.0
 * @category Cache
 *
 */
export class TTLCacheProvider<K = any, V = any> extends LRUCacheProvider<K, V> {

  constructor(ttl: number = 30 * 1000, checkInterval: number = 60 * 1000, maxEntry = 10240) {
    super(maxEntry);
    this.ttl = ttl;
    this.checkInterval = checkInterval;
    this.timeoutStorage = new LRUCacheProvider(maxEntry);
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

export const cacheProvider= {
  LRUCacheProvider,
  TTLCacheProvider
};
