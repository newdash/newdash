import { AsyncFunction } from "../types";
import { LRUMap } from "./LRUMap";
import Semaphore from "./Semaphore";
import toHashCode from "./toHashCode";

const KEY_DEFAULT = "default";

const DEFAULT_EXTRACTOR = (args: any[]) => args;

/**
 * high level SemaphoreMap
 *
 * @since 5.18.0
 * @category Functional
 */
export class SemaphoreMap {


  private _container: Map<any, Semaphore>;

  private _defaultSemCount: number;

  /**
   * SemaphoreMap, provision semaphore with giving key
   *
   * @param maximumSemObjects maximumSemObjects to avoid OOM, the default value is 1000000
   * @param defaultSemCount default sem permit number, the default value is 10
   */
  constructor(maximumSemObjects = 1000 * 1000, defaultSemCount = 10) {
    this._container = new LRUMap<any, Semaphore>(maximumSemObjects);
    this._defaultSemCount = defaultSemCount;
  }

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
   * @param key the key of semaphore
   * @param runner async runner
   */
  public execute<T>(key: any = KEY_DEFAULT, runner: AsyncFunction<any[], T>) {
    return this.getOrCreate(key).use(runner);
  }

  /**
   * wrap a function with semaphore, the different parameter will use different semaphore instance
   *
   * simply, it could be used as a deeply 'limit' function,
   * after wrapping,
   * the function will be limited by parameter values (by specific semaphore total count)
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

  /**
   * static 'wrap' creator for function
   * @param maxSemNum
   * @param defaultSemCount
   * @param runner
   * @returns
   */
  public static wrap<P extends any[], T>(
    maxSemNum: number,
    defaultSemCount: number,
    runner: AsyncFunction<P, T>
  ): AsyncFunction<P, T> {
    return (new SemaphoreMap(maxSemNum, defaultSemCount)).wrap(runner);
  }

}


export default SemaphoreMap;
