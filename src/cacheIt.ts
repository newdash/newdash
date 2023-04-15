/* eslint-disable max-len */
import { CacheConfig, CacheProvider, LRUCacheProvider } from "./cacheProvider";
import { toHashCode } from "./functional/toHashCode";
import { isClass } from "./isClass";
import { Class, GeneralFunction } from "./types";

/**
 * @private
 * @ignore
 * @internal
 */
const KEY_CACHE_PROPERTY = "__cache_storage";
/**
 * @private
 * @ignore
 * @internal
 */
const KEY_CLEAR_CACHE_FUNCTION = "__cache_clear";

export type CachedFunction<T extends GeneralFunction> = T & {
  /**
   * get the cache provider
   */
  [KEY_CACHE_PROPERTY]: CacheProvider<string, ReturnType<T>>;
  /**
   * clear cache by parameters
   */
  [KEY_CLEAR_CACHE_FUNCTION]: (...args: Parameters<T>) => void;
}

export type CachedObject<T = any> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any | T[K] ? CachedFunction<T[K]> : T[K]
}

export type CachedClass<T extends new (...args: any[]) => any> = new (...args: any[]) => CachedObject<InstanceType<T>>

export interface CacheItOptions<CACHE_PARAM = any> {
  /**
   * provider type, the constructor of CacheProvider
   */
  provider?: Class<CacheProvider<any, any>>;
  /**
   * provider constructor args
   *
   * @deprecated
   */
  providerArgs?: Array<any>;
  /**
   * provider config
   */
  providerOptions?: CacheConfig<CACHE_PARAM>;
}

const defaultCacheItOptions: CacheItOptions = {
  provider: LRUCacheProvider,
  providerArgs: undefined,
  providerOptions: {},
};

/**
 * @private
 * @ignore
 * @internal
 * @param obj
 * @param options
 */
function cacheItFunction(obj: any, options?: CacheItOptions) {
  const cacheProvider = options.providerOptions !== undefined ? new options.provider(options.providerOptions) : new options.provider(...options.providerArgs);

  const clearCache = (...args: any[]) => {
    cacheProvider.delete(toHashCode(args));
  };

  return new Proxy(obj, {
    apply: (target, ctx, args) => {
      const producer = () => target.apply(ctx, args);
      const key = toHashCode(args);
      return cacheProvider.getOrCreate(key, producer);
    },
    get: (target, propertyName) => {
      if (propertyName in target) {
        return target[propertyName];
      }
      if (propertyName === KEY_CACHE_PROPERTY) {
        return cacheProvider;
      }
      if (propertyName === KEY_CLEAR_CACHE_FUNCTION) {
        return clearCache;
      }
      return undefined;
    }
  });

}

/**
 * @private
 * @ignore
 * @internal
 * @param obj
 * @param options
 */
function cacheItClass<T>(obj: Class<T>, options?: CacheItOptions) {

  return new Proxy(obj, {
    construct: (target, args) => cacheItObject(new target(...args), options)
  });

}

/**
 * @private
 * @ignore
 * @internal
 * @param obj
 * @param options
 */
function cacheItObject(obj: any, options?: CacheItOptions) {

  const methodsCacheProvider = new LRUCacheProvider(10240);

  return new Proxy(obj, {
    get: ((target, propertyName) => {
      if (propertyName in target) {
        const propertyValue = target[propertyName];
        if (typeof propertyValue === "function") {
          const producer = () => cacheItFunction(propertyValue, options);
          return methodsCacheProvider.getOrCreate(propertyName, producer);
        }
        return propertyValue;
      }
    })
  });

}

/**
 * make all methods of object are cached
 *
 * @since 5.16.0
 * @category Util
 * @param obj
 * @param options
 * @example
 *
 * ```ts
 *
    // set max cache size
    const f = cacheIt((value: number) => (++idx) + value, {
      providerOptions: {
        params: {
          max_entries: 2
        }
      }
    });
    expect(f.__cache_storage["_maxSize"]).toBe(2);

    expect(f(0)).toBe(1);
    expect(f(0)).toBe(1);
    ```
 */
export function cacheIt<T extends GeneralFunction>(obj: T, options?: CacheItOptions): CachedFunction<T>
/**
 * create a class wrapper, the instance created by that wrapper will automatically apply `cacheIt`
 * @since 5.16.0
 * @param obj
 * @param options
 *
 * @example
 *
 * ```ts
 *  class A {
      constructor(idx = 0) { this.idx = idx; }
      private idx: number
      public add(value: number) {
        return (++this.idx) + value;
      }
    }
    const CachedA = cacheIt(A);
    const a = new CachedA(1);
    expect(a.add(0)).toBe(2);
    expect(a.add(0)).toBe(2);

    expect(a.add(1)).toBe(4);
    expect(a.add(1)).toBe(4);
  ```
 */
export function cacheIt<T extends Class>(obj: T, options?: CacheItOptions): CachedClass<T>
/**
 * make function is cached, default with LRU container
 *
 * @since 5.16.0
 * @category Util
 * @param obj
 * @param options
 */
export function cacheIt<T extends object>(obj: T, options?: CacheItOptions): CachedObject<T>
export function cacheIt<T extends object>(obj: T, options?: CacheItOptions): CachedObject<T>
export function cacheIt(obj: any, options?: any): any {

  // assign default option
  options = Object.assign({}, defaultCacheItOptions, options);

  switch (typeof obj) {
    case "object":
      return cacheItObject(obj, options);
    case "function":
      if (isClass(obj)) {
        return cacheItClass(obj, options);
      }
      return cacheItFunction(obj, options);
    default:
      return obj;
  }

}


export default cacheIt;
