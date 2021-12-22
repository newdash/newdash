

/**
 * TTL (Time to Life) Map
 *
 * will remove the oldest item when reach the time, also will remove the not access recently
 *
 * it will schedule job, lazy remove instance
 *
 * @category Functional
 * @since 5.18.0
 */
export class TTLMap<K = any, V = any> extends Map<K, V> {

  /**
   * TTLMap (Time to Life) Map
   *
   * will remove the oldest item when reach the time, also will remove the not access recently
   *
   * @param defaultTTL time to live, in milliseconds, default value is 60 seconds
   * @param cleanAfterOperation execute full clean after operations. default value is 100, it means, at least 100 operations performed, the TTL evict logic will be executed
   */
  constructor(defaultTTL: number = 60 * 1000, cleanAfterOperation: number = 100) {
    super();
    this.defaultTTL = defaultTTL;
    this.timeoutStorage = new Map();
    if (cleanAfterOperation > 1) {
      this.cleanAfterOperation = cleanAfterOperation;
    }
    this.operationCount = 0;
  }

  /**
   * default TTL value in milliseconds
   */
  private defaultTTL: number;

  private cleanAfterOperation: number;

  private operationCount: number;

  private timeoutStorage: Map<K, V>;

  private timestamp() {
    return Date.now();
  }

  /**
   * _checkAndClean
   *
   * for the simple operations (set/get/delete/has), the clean operation will not execute every time
   */
  private _checkAndClean() {
    if (this.operationCount++ > this.cleanAfterOperation) {
      this.operationCount = 0;
      this.cleanTimeoutItems();
    }
  }

  /**
   * set value
   *
   * @param k key
   * @param v value
   * @param ttl time to live, in milliseconds, if undefined, will use instance level defaultTTL
   * @returns
   */
  public set(k: K, v: V, ttl: number = this.defaultTTL) {
    this._checkAndClean();
    super.set(k, v);
    this.timeoutStorage.set(k, (this.timestamp() + ttl) as any); // refresh timeout
    return this;
  }

  public has(k: K) {
    this._checkAndClean();
    let rt = false;
    if (super.has(k)) {
      const isTimeout = this.checkTimeout(k);
      if (isTimeout) {
        rt = false;
      } else {
        rt = true;
      }
    }
    return rt;
  }

  public get(k: K): V | undefined {
    this._checkAndClean();
    let rt = undefined;
    if (super.has(k)) {
      const isTimeout = this.checkTimeout(k);
      if (isTimeout) {
        rt = undefined;
      } else {
        rt = super.get(k);
      }
    }
    return rt;
  }

  public delete(k: K) {
    this._checkAndClean();
    const rt = super.delete(k);
    this.timeoutStorage.delete(k);
    return rt;
  }

  public clear(): void {
    super.clear();
    this.timeoutStorage.clear();
    this.operationCount = 0;
  }

  /**
   * return true if timeout
   *
   * @param k
   */
  private checkTimeout(k: K, currentTimeStamp = this.timestamp()) {
    const isTimeout = this.getTimeout(k) < currentTimeStamp;
    if (isTimeout) {
      super.delete(k);
      this.timeoutStorage.delete(k);
    }
    return isTimeout;
  }

  private getTimeout(k: K) {
    if (this.timeoutStorage.has(k)) {
      return this.timeoutStorage.get(k);
    }
    return 0;
  }

  /**
   * manually directly clean all timeout items
   */
  public cleanTimeoutItems() {
    const current = this.timestamp();
    super.forEach((_, key) => { this.checkTimeout(key, current); });
  }

  public entries() {
    this.cleanTimeoutItems();
    return super.entries();
  }

  public keys() {
    this.cleanTimeoutItems();
    return super.keys();
  }

  public values() {
    this.cleanTimeoutItems();
    return super.values();
  }

  public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    this.cleanTimeoutItems();
    return super.forEach(callbackfn, thisArg);
  }

  public get size() {
    this.cleanTimeoutItems();
    // @ts-ignore
    return super.size;
  }


}

export default TTLMap;
