
/**
 * Convert Array To Tuple (with order)
 *
 * @private
 * @internal
 * @ignore
 */
export type Tuple<T extends Array<any>> = { [K in keyof T]: T[K] };

/**
 * @ignore
 */
export type Collection<T = any> = Array<T> | Record<string, T>

/**
 * @ignore
 */
export type PlainObject<T = any> = Record<string, T>

/**
 * @ignore
 */
interface Iteratee<T, R> {
  (value?: T, key?: number, ref?: Array<T>): R;
  (value?: T, key?: string, ref?: Record<string, T>): R;
}

/**
 * @ignore
 */
interface AccumulatorIteratee<T, R> {
  (accumulator?: R, value?: T, key?: number): R | void
  (accumulator?: R, value?: T, key?: string): R | void
}


/**
 * @ignore
 * @template T item type
 * @template R return type
 */
export type CollectionIteratee<T = any, R = any> = Iteratee<T, R>

/**
 * @ignore
 */
export type ArrayIteratee<T, R = any> = (value?: T, key?: number, ref?: Array<T>) => R;

/**
 * @ignore
 */
export type RecordIteratee<T, R = any> = (value?: T, key?: string, ref?: Record<string, T>) => R;

/**
 * @ignore
 */
export type AccCollectionIteratee<T = any, R = any> = AccumulatorIteratee<T, R>
/**
 * @ignore
 */
export type KeyIteratee = string | number
/**
 * @ignore
 */
export type Entry<T = any> = [string, T]
/**
 * @ignore
 */
export type ArrayAble<T> = T | Array<T>

/**
 * @ignore
 */
type NumPath = number;
/**
 * @ignore
 */
type StringPath = string
/**
 * @ignore
 */
type ArrayPath = ArrayAble<StringPath | NumPath>

/**
 * path type
 *
 * @ignore
 */
export type Path = ArrayPath


/**
 * comparator
 * @ignore
 */
export interface Comparator<T = any> {
  (v1?: T, v2?: T): boolean
}


/**
 * Unwrap Promise Generic Type
 */
export type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;

export type Keys<T> = keyof T;

/**
 * Same as Partial<T> but goes deeper and makes Partial<T> all its properties and sub-properties.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};

/**
 * Partial Object
 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * optional version of Parameters
 */
export type OptionalParameters<T extends Function> = T extends (...args: infer P) => any ? { [K in keyof P]?: P[K] } : never;

/**
 * Class constructor
 */
export type Class<T = any> = new (...args: any[]) => T

export type AsyncFunction = (...args: any[]) => Promise<any>

export type ReturnType<T> = T extends (...args: any) => infer R ? R : any;
