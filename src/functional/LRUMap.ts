// ref: https://stackoverflow.com/a/46432113/4380476
// Author: odinho - Velmont

import { mustProvide } from "../assert";
import { InValidParameterError } from "../assert/errors";

export class LRUMap<K = any, V = any> extends Map<K, V> {

  /**
   * the max number of total items
   */
  private _maxSize: number;

  /**
   * LRU (Least Recently Used) Map implementation
   *
   * will remove the oldest item when reach the size limit
   *
   * @category Functional
   * @since 5.15.0
   * @param maxSize maximum cache item number, default is 1024
   * @example
   *
   * ```ts
   * const m = new LRUMap(1)
   * m.set('a','v') // {'a':'v'}
   * m.set('b','c') // {'b':'c'}
   * ```
   */
  constructor(maxSize = 1024) {
    super();
    mustProvide(maxSize, "maxSize", "number");
    if (maxSize < 1) {
      throw new InValidParameterError(`for LRUMap, must provide a positive value which >=1, giving ${maxSize}`);
    }
    this._maxSize = maxSize;
  }

  public get(key: K) {
    if (super.has(key)) {
      const item = super.get(key);
      // refresh key
      super.delete(key);
      super.set(key, item);
    }

    return super.get(key);
  }

  public set(key: K, val: V): this {
    // refresh key
    if (super.has(key)) { super.delete(key); }
    // evict oldest
    else if (this.size >= this._maxSize) { super.delete(this.first()); }
    super.set(key, val);
    return this;
  }

  public clear(): void {
    super.clear();
  }

  private first(): K {
    return super.keys().next().value;
  }

  public setMaxSize(maxSize: number) {
    this._maxSize = maxSize;
  }

  public getMaxSize() {
    return this._maxSize;
  }

}
