// ref https://github.com/notenoughneon/await-semaphore
// The MIT License (MIT)

// Copyright (c) 2016 Emma Kuo

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// copy for deno runtime

import { mustProvide } from "../assert";

/**
 * @private
 * @internal
 * @ignore
 */
type ReleaseFunction = () => void

/**
 * @private
 * @internal
 * @ignore
 */
type Task = Function & { hasTimeout: boolean, hasReleased: boolean, hasAcquired: boolean }


export class Semaphore {

  private tasks: Array<Task> = [];
  private count: number;
  private defaultAcquireTimeout = -1;


  /**
   * Semaphore implementation for async js operations, used for resource limit or pool implementation
   *
   * @since 5.15.0
   * @category Functional
   *
   * @example
   *
   * ```ts
   * const sem = new Semaphore(10)
   *
   * async call_api(payload: any) {
   *   const release = await sem.acquire()
   *   // ...
   *   // this block, will be execute with 10 concurrency limit
   *   release()
   * }
   *
   * ```
   */
  constructor(count: number, defaultAcquireTimeout: number = -1) {
    mustProvide(count, "count", "number");
    this.count = count;
    this.defaultAcquireTimeout = defaultAcquireTimeout;
  }

  private _schedule() {
    if (this.count > 0 && this.tasks.length > 0) {
      this.count--;
      const next = this.tasks.shift();
      mustProvide(next, "task", "function");
      next();
    }
  }


  /**
   * acquire a permit from sem
   *
   * @param timeout wait before timeout, if not set, will wait forever
   * @returns release function, which used for release a permit to sem
   */
  public acquire(timeout: number = this.defaultAcquireTimeout) {
    mustProvide(timeout, "timeout", "number");
    return new Promise<ReleaseFunction>((resolve, reject) => {
      // delay tasks
      const task = () => {
        if (task.hasTimeout) {
          // has timeout
          // resume semaphore
          this.count++;
          // re-schedule next one
          this._schedule();
        }
        else {
          task.hasAcquired = true;
          // return acquire
          resolve(() => {
            // call by release
            if (!task.hasReleased) {
              task.hasReleased = true;
              this.count++;
              this._schedule();
            }
          });
        }

      };
      task.hasTimeout = false;
      task.hasReleased = false;
      task.hasAcquired = false;
      // queue task
      this.tasks.push(task);
      setTimeout(() => this._schedule(), 0);
      if (typeof timeout === "number" && timeout > 0 && !isNaN(timeout) && isFinite(timeout)) {
        setTimeout(() => {
          if (!task.hasAcquired) {
            task.hasTimeout = true;
            reject(new Error(`semaphore acquire timeout: ${timeout}`));
          }
        }, timeout);
      }
    });
  }

  /**
   * run an async function with sem limit
   *
   * @param f async runner function
   * @param timeout wait timeout before wait
   * @returns
   */
  public async use<T>(f: () => Promise<T>, timeout: number = this.defaultAcquireTimeout) {
    mustProvide(f, "f", "function");
    mustProvide(timeout, "timeout", "number");
    return this
      .acquire(timeout)
      .then((release) => {
        const fResult = f();
        if (fResult?.then !== undefined && typeof fResult?.then === "function") {
          return fResult.finally(release);
        }
        release();
        return fResult;
      });
  }
}


export default Semaphore;
