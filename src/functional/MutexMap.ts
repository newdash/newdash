import SemaphoreMap from "./SemaphoreMap";


/**
 * Mutex Map
 *
 * @since 5.20.0
 * @category Functional
 */
export class MutexMap extends SemaphoreMap {

  /**
   * Mutex Map Implementation
   *
   * @param maximumMutex to avoid OOM, the default value is 1000000
   */
  constructor(maximumMutex = 1000 * 1000) {
    super(maximumMutex, 1);
  }


}

export default MutexMap;
