

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

  /**
   *
   * @param ttl time to live
   * @param cleanAfterOperation execute full clean after operations
   */
  constructor(ttl?: number, cleanAfterOperation?: number) {
    super();
    this.ttl = ttl;
    this.timeoutStorage = new Map();
    if (cleanAfterOperation > 1) {
      this.cleanAfterOperation = cleanAfterOperation;
    }
    this.cleanCount = 0;
  }

  private ttl: number;

  private cleanAfterOperation: number = 1024;

  private cleanCount: number = 0;

  private timeoutStorage: Map<K, V>;

  private timestamp() {
    return new Date().getTime();
  }

  private _checkAndClean() {
    if (this.cleanCount++ > this.cleanAfterOperation) {
      this.cleanCount = 0;
      this.cleanTimeoutItems();
    }
  }

  set(k: K, v: V) {
    super.set(k, v);
    this.timeoutStorage.set(k, (this.timestamp() + this.ttl) as any); // refresh timeout
    this._checkAndClean();
    return this;
  }

  has(k: K) {
    let rt = false;
    if (super.has(k)) {
      const isTimeout = this.checkTimeout(k);
      if (isTimeout) {
        rt = false;
      } else {
        rt = true;
      }
    }
    this._checkAndClean();
    return rt;
  }

  get(k: K) {
    let rt = undefined;
    if (super.has(k)) {
      const isTimeout = this.checkTimeout(k);
      if (isTimeout) {
        rt = undefined;
      }
      rt = super.get(k);
    }
    this._checkAndClean();
    return rt;
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
    this._checkAndClean();
    return rt;
  }

  /**
   * clean all timeout items
   */
  public cleanTimeoutItems() {
    const current = this.timestamp();
    super.forEach((_, key) => { this.checkTimeout(key, current); });
  }

  entries() {
    this.cleanTimeoutItems();
    return super.entries();
  }

  keys() {
    this.cleanTimeoutItems();
    return super.keys();
  }

  values() {
    this.cleanTimeoutItems();
    return super.values();
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    this.cleanTimeoutItems();
    return super.forEach(callbackfn, thisArg);
  }

  get size() {
    this.cleanTimeoutItems();
    // @ts-ignore
    return super.size;
  }


}

export default TTLMap;
