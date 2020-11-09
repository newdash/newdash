// ref: https://stackoverflow.com/a/46432113/4380476
// Author: odinho - Velmont

import { mustProvide } from '../assert';

/**
 * LRU Map
 *
 * will remove the oldest item when reach the size limit
 *
 * @category Functional
 * @since 5.15.0
 */
export class LRUMap<K = any, V = any> extends Map<K, V> {

  /**
   * the max number of total items
   */
  private maxSize: number;

  /**
   * LRU Cache
   *
   * @param maxSize maximum cache item number
   */
  constructor(maxSize = 1024) {
    super();
    mustProvide(maxSize, 'maxSize', 'number');
    this.maxSize = maxSize;
  }

  get(key: K) {

    if (super.has(key)) {
      const item = super.get(key);
      // refresh key
      super.delete(key);
      super.set(key, item);
    }

    return super.get(key);
  }

  set(key: K, val: V): this {
    // refresh key
    if (super.has(key)) { super.delete(key); }
    // evict oldest
    else if (this.size >= this.maxSize) { super.delete(this.first()); }
    super.set(key, val);
    return this;
  }

  private first(): K {
    return super.keys().next().value;
  }

}
