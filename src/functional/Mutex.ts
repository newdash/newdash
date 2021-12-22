import { Semaphore } from "./Semaphore";

/**
 * Mutex, the mutex implementation for async operations
 */
export class Mutex extends Semaphore {
  /**
   * Mutex, the mutex implementation for async operations
   *
   * @since 5.15.0
   * @category Functional
   * @example
   *
   * ```ts
   *  const mut = new Mutex()
   *
   *  async call_api(payload: any) {
   *  const release = await mut.acquire()
   *    try {
   *      // ...
   *      // this block, will be executed exclusively
   *    } finally {
   *      release() // release the mutex
   *    }
   * }
   *
   * ```
   *
   */
  constructor(defaultAcquireTimeout: number = -1) { super(1, defaultAcquireTimeout); }
}

export default Mutex;
