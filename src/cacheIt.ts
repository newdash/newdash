import { CacheProvider, LRUCacheProvider } from './cacheProvider';
import { toHashCode } from './functional/toHashCode';
import { Class, GeneralFunction } from './types';

const KEY_CACHE_PROPERTY = '__cache_storage';

const KEY_CLEAR_CACHE_FUNCTION = '__cache_clear';

export type CachedFunction<T extends GeneralFunction> = T & {
  [KEY_CACHE_PROPERTY]: CacheProvider<string, ReturnType<T>>;
  /**
   * clear cache by parameters
   */
  [KEY_CLEAR_CACHE_FUNCTION]: (...args: Parameters<T>) => void;
}

export type CachedObject<T = any> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? CachedFunction<T[K]> : T[K]
}

export interface CacheItOptions {
  /**
   * provider type, the constructor of CacheProvider
   */
  provider?: Class<CacheProvider<any, any>>;
  /**
   * provider constructor args
   */
  providerArgs?: any[];
}

const defaultCacheItOptions: CacheItOptions = {
  provider: LRUCacheProvider,
  providerArgs: []
};

function cacheItFunction(obj: any, options?: CacheItOptions) {
  const cacheProvider = new options.provider(...options.providerArgs);

  const clearCache = (...args: any[]) => {
    cacheProvider.delete(toHashCode(args));
  };

  return new Proxy(obj, {
    apply: (target, ctx, args) => {
      const key = toHashCode(args);
      const producer = () => target.apply(ctx, args);
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


function cacheItObject(obj: any, options?: CacheItOptions) {

  const methodsCacheProvider = new LRUCacheProvider(10240);

  return new Proxy(obj, {
    get: ((target, propertyName) => {
      if (propertyName in target) {
        const propertyValue = target[propertyName];
        if (typeof propertyValue === 'function') {
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
 */
export function cacheIt<T extends GeneralFunction>(obj: T, options?: CacheItOptions): CachedFunction<T>
/**
 * make function is cached
 * @since 5.16.0
 * @category Util
 * @param obj
 * @param options
 */
export function cacheIt<T extends object>(obj: T, options?: CacheItOptions): CachedObject<T>
export function cacheIt(obj: any, options?: CacheItOptions): any {

  // assign default option
  options = Object.assign({}, defaultCacheItOptions, options);

  switch (typeof obj) {
    case 'object':
      return cacheItObject(obj, options);
    case 'function':
      return cacheItFunction(obj, options);
    default:
      return obj;
  }

}

export default cacheIt;
