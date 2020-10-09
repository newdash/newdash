// ref: https://stackoverflow.com/a/46432113/4380476
// Author: odinho - Velmont

export class LRUCache<K = any, V = any> extends Map<K, V> {

  private maximumCacheItemNumber: number;

  /**
   * LRU Cache
   *
   * @param maximumCacheItemNumber maximum cache item number
   */
  constructor(max = 1024) {
    super();
    this.maximumCacheItemNumber = max;
  }

  get(key: K) {
    const item = super.get(key);
    if (item) {
      // refresh key
      super.delete(key);
      super.set(key, item);
    }
    return item;
  }

  set(key: K, val: V): this {
    // refresh key
    if (super.has(key)) { super.delete(key); }
    // evict oldest
    else if (this.size >= this.maximumCacheItemNumber) { super.delete(this.first()); }
    super.set(key, val);
    return this;
  }

  private first(): K {
    return super.keys().next().value;
  }

}
