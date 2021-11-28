import SemaphoreMap from "./SemaphoreMap";


/**
 * MutexMap
 *
 * @since 5.20.0
 * @category Functional
 */
export class MutexMap extends SemaphoreMap {

  constructor(maximumMutex = 1000 * 1000) {
    super(maximumMutex, 1);
  }


}

export default MutexMap;
