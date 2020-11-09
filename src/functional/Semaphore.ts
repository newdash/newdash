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

import { mustProvide } from '../assert';

/**
 * Semaphore implementation for javascript
 */
export class Semaphore {

  private tasks: (() => void)[] = [];
  private count: number;

  constructor(count: number) {
    mustProvide(count, 'count', 'number');
    this.count = count;
  }

  private schedule() {
    if (this.count > 0 && this.tasks.length > 0) {
      this.count--;
      const next = this.tasks.shift();
      mustProvide(next, 'task', 'function');
      next();
    }
  }

  public acquire() {
    return new Promise<() => void>((res, rej) => {
      const task = () => {
        let released = false;
        res(() => {
          if (!released) {
            released = true;
            this.count++;
            this.schedule();
          }
        });
      };
      this.tasks.push(task);
      setTimeout(this.schedule.bind(this), 0);
    });
  }

  public async use<T>(f: () => Promise<T>) {
    return this.acquire()
      .then((release) => f()
        .then((res) => {
          release();
          return res;
        })
        .catch((err) => {
          release();
          throw err;
        }));
  }
}

export class Mutex extends Semaphore {
  constructor() {
    super(1);
  }
}
