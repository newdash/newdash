import { Semaphore } from "./Semaphore";

/**
 * Mutex
 *
 * @since 5.15.0
 * @category Functional
 */
export class Mutex extends Semaphore {
  constructor(defaultAcquireTimeout: number = -1) { super(1, defaultAcquireTimeout); }
}

export default Mutex;
