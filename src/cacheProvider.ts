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
