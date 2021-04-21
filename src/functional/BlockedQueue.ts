

/**
 * BlockedQueue
 *
 * provide a blocked queue for async operations
 *
 * @since 5.19.0
 * @category Functional
 */
export class BlockedQueue<I = any> {

  private _capacity: number;
  private _notifyQueue: Array<Function>;

  private _container: Array<I>;

  constructor(capacity = 1000) {
    this._capacity = capacity;
    this._container = new Array(0);
    this._notifyQueue = new Array(0);
  }

  async enQueue(item: I): Promise<void> {

    if (this._container.length >= this._capacity) {

      return new Promise((resolve) => {
        this._notifyQueue.push(() => {
          this._container.push(item);
          resolve();
        });
      });

    }

    this._container.push(item);
    return;

  }

  async deQueue(): Promise<I> {
    if (this._container.length > 0) {
      const item = this._container.shift();
      if (this._notifyQueue.length > 0) {
        this._notifyQueue.shift()();
      }
      return item;
    }
    return undefined;
  }


}


export default BlockedQueue;
