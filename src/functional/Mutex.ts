import { Semaphore } from './Semaphore';

/**
 * Mutex
 *
 * @since 5.15.0
 * @category Concurrency
 */
export class Mutex extends Semaphore {
  constructor() { super(1); }
}

export default Mutex;
