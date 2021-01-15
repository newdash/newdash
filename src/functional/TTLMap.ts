

/**
 * LRU Map
 *
 * will remove the oldest item when reach the time, also will remove the not access recently
 *
 * lazy remove instance
 *
 * @category Functional
 * @since 5.18.0
 */
export class TTLMap<K = any, V = any> extends Map<K, V> {

  constructor(ttl?: number) {
    super();
    this.ttl = ttl;
    this.timeoutStorage = new Map();
  }

  private timestamp() {
    return new Date().getTime();
  }

  set(k: K, v: V) {
    super.set(k, v);
    this.timeoutStorage.set(k, (this.timestamp() + this.ttl) as any); // refresh timeout
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
    if (isTimeout) { this.delete(k); }
    return isTimeout;
  }

  private getTimeout(k: K) {
    if (this.timeoutStorage.has(k)) {
      return this.timeoutStorage.get(k);
    }
    return 0;
  }

  delete(k: K) {
    const rt = super.delete(k);
    this.timeoutStorage.delete(k);
    return rt;
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
  }

  private ttl: number;

  private timeoutStorage: Map<K, V>;

}

export default TTLMap;
