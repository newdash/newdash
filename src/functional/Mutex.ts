import { Semaphore } from './Semaphore';

/**
 * Mutex
 *
 * @since 5.15.0
 * @category Functional
 */
export class Mutex extends Semaphore {
  constructor() { super(1); }
}

export default Mutex;
