import { LRUMap } from "./functional/LRUMap";

/**
 * @ignore
 */
export interface MapLike<K = any, V = any> {
  clear?(): void;
  delete?(key: K): boolean;
  forEach?(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
}

/**
 * @ignore
 */
export interface MapLikeConstructor<K = any, V = any> {
  new(): MapLike<K, V>
}

/**
 * @ignore
 */
export type MemorizedFunction<T extends (...any) => any, K = any, V = any> = {
  (...args: Parameters<T>): ReturnType<T>;
  /**
   * cache instance for this function instance
   */
  cache: MapLike<K, V>;
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @since 5.2.0
 * @category Function
 * @param func The function to have its output memoized.
 * @param resolver The function to resolve the cache key. default will use the **FIRST** argument as key
 * @returns Returns the new memoized function.
 * @example
 *
 *
 * ```js
 * const object = { 'a': 1, 'b': 2 }
 * const other = { 'c': 3, 'd': 4 }
 *
 * const values = memoize(values)
 * values(object)
 * // => [1, 2]
 *
 * values(other)
 * // => [3, 4]
 *
 * object.a = 2
 * values(object)
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b'])
 * values(object)
 * // => ['a', 'b']
 *
 * // Replace `memoize.Cache` constructor implementation.
 * memoize.Cache = WeakMap
 * ```
 */
export function memoize<T extends(...args: any[]) => any, K>(
  func: T,
  resolver?: (...args: Parameters<T>) => K
): MemorizedFunction<T, K, ReturnType<T>> {
  if (typeof func !== "function" || (resolver != null && typeof resolver !== "function")) {
    throw new TypeError("Expected a function");
  }

  const memoized = function(...args: any[]) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this as any, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || LRUMap);
  return memoized;
}

/**
 * Cache constructor of memorize function
 */
memoize.Cache = Map as MapLikeConstructor;

export default memoize;
