/* eslint-disable space-before-function-paren */
import assert from 'assert';
import { retry } from '../src/retry';
import { assertShouldThrowError } from './helpers';


describe('retry', () => {

  it('should retry multi time', async () => {

    let count = 1;
    async function runner(v: number): Promise<number> {
      return new Promise((resolve, reject) => {
        count++;
        if (count < 10) {
          reject(count + v);
        } else {
          resolve(count + v);
        }
      });

    }

    const c = retry(runner, 10);

    assert.strictEqual(await c(11), 21);


  });

  it('should reject when retry number exceed', async () => {

    let count = 1;
    async function runner(v: number): Promise<number> {
      return new Promise((resolve, reject) => {
        count++;
        if (count < 10) {
          reject(count + v);
        } else {
          resolve(count + v);
        }
      });

    }

    const c = retry(runner, 5);

    assertShouldThrowError(() => c(11), 18);

  });


});
