import { mustProvide } from '../assert';

/**
 *
 * queue pending size out of limit
 *
 * @internal
 * @private
 * @ignore
 */
export class QueueOverFlowError extends Error {

}

/**
 * BlockedQueue
 *
 * a blocked queue for async operations
 *
 * @since 5.19.0
 * @category Functional
 */
export class BlockedQueue<I = any> {

  private _capacity: number;
  private _notifyQueue: Array<Function>;
  private _maxPending: number;
  private _container: Array<I>;

  /**
   * @param capacity default 1000
   * @param maxPending default 10 * capacity, the max allowed number of pending items
   */
  constructor(capacity = 1000, maxPending = 10 * capacity) {
    mustProvide(capacity, 'capacity', 'number');
    mustProvide(maxPending, 'maxPending', 'number');
    this._capacity = capacity;
    this._container = new Array(0);
    this._notifyQueue = new Array(0);
    this._maxPending = maxPending;
  }

  /**
   * push an item to the queue, blocked when the queue is full
   *
   * @throws {QueueOverFlowError} throw when pending items are too much
   * @param item
   * @returns
   */
  async enQueue(item: I): Promise<void> {

    if (this._container.length >= this._capacity) {

      if (this._notifyQueue.length <= this._maxPending) {
        return new Promise((resolve) => {
          this._notifyQueue.push(() => {
            this._container.push(item);
            resolve();
          });
        });
      }

      throw new QueueOverFlowError(`BlockedQueue: the number of pending items is more than the max allowed number of pending items: '${this._maxPending}', value: '${item}'`);

    }

    this._container.push(item);

    return;

  }


  /**
   * retrieve an item from queue
   *
   * @returns
   */
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
