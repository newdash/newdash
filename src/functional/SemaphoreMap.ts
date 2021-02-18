import { AsyncFunction } from '../types';
import { LRUMap } from './LRUMap';
import Semaphore from './Semaphore';
import toHashCode from './toHashCode';

const KEY_DEFAULT = 'default';

const DEFAULT_EXTRACTOR = (args: any[]) => args;

/**
 * high level SemaphoreMap
 *
 * @since 5.18.0
 * @category Functional
 */
export class SemaphoreMap {

  constructor(maxSemaphoreNum = 100 * 10000, defaultSemCount = 10) {
    this._container = new LRUMap<any, Semaphore>(maxSemaphoreNum);
    this._defaultSemCount = defaultSemCount;
  }

  private _container: Map<any, Semaphore>;

  private _defaultSemCount: number;

  /**
   * get semaphore or create a new one
   *
   * @param semaphoreKey
   * @param count
   */
  public getOrCreate(semaphoreKey: any = KEY_DEFAULT, count?: number) {
    const hashKey = toHashCode(semaphoreKey);
    if (!this._container.has(hashKey)) {
      this._container.set(hashKey, new Semaphore(count ?? this._defaultSemCount));
    }
    return this._container.get(hashKey);
  }


  /**
   * execute function with specify semaphore instance
   *
   * @param semaphoreKey
   * @param f
   */
  public execute<T>(semaphoreKey: any = KEY_DEFAULT, f: AsyncFunction<any[], T>) {
    return this.getOrCreate(semaphoreKey).use(f);
  }

  /**
   * wrap a function with semaphore, the different parameter will use different semaphore instance
   *
   * @param runner
   * @param runner params extractor, the return value will be used to determine the semaphore
   */
  public wrap<P extends any[], T>(
    runner: AsyncFunction<P, T>,
    extractor: (args: P) => any = DEFAULT_EXTRACTOR
  ): AsyncFunction<P, T> {
    return (...args: P) => this.execute(extractor(args), runner);
  }

  public static wrap<P extends any[], T>(
    maxSemNum: number,
    defaultSemCount: number,
    runner: AsyncFunction<P, T>
  ): AsyncFunction<P, T> {
    return (new SemaphoreMap(maxSemNum, defaultSemCount)).wrap(runner);
  }

}


export default SemaphoreMap;
