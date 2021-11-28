import type { PromiseExecutor } from "../types";


/**
 * @internal
 */
const GlobalPromise = Promise;

/**
 * LazyPromise, execute async operation when user await it.
 *
 * @author Theo Sun
 *
 * @category Async
 * @since 5.18.0
 */
export class LazyPromise<T = any> implements Promise<T> {

  private _executor: PromiseExecutor<T>;
  private _promise: Promise<T>;

  /**
   * LazyPromise, execute async operation when user await it.
   *
   * @param executor Promise executor
   */
  constructor(executor: PromiseExecutor<T>) {
    this._executor = executor;
  }

  [Symbol.toStringTag]: string;

  private _getPromise(): Promise<T> {
    if (this._promise === undefined) {
      this._promise = new GlobalPromise(this._executor) as any;
    }
    return this._promise;
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2> {
    return this._getPromise().then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?: (reason: any) => TResult | PromiseLike<TResult>
  ): Promise<T | TResult> {
    return this._getPromise().catch(onrejected);
  }

  finally(onfinally?: () => void): Promise<T> {
    return this._getPromise().finally(onfinally);
  }


}
