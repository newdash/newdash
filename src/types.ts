
/**
 * @private
 * @internal
 * @ignore
 */
export type Tuple<T> = { [K in keyof T]: T[K] };

/**
 * @ignore
 */
export type Collection<T = any> = Array<T> | Record<string, T>

/**
 * @ignore
 */
export type PlainObject<T = any> = Record<string, T>

interface Iteratee<T, R, K> {
  (value?: T, key?: K): R
}

/**
 * @ignore
 * @template T item type
 * @template R return type
 */
export type CollectionIteratee<T = any, R = any> = Iteratee<T, R, number>

export type KeyIteratee = string | number


