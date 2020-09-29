// @ts-nocheck
import assert from 'assert';
import { createTimeoutPromise, TimeoutError } from '../src/timeout';
import { assertShouldThrowError } from './helpers';

describe('Timeout Test Suite', () => {


  it('should support raise error on timeout', async () => {

    await assertShouldThrowError(
      () => createTimeoutPromise((resolve) => { setTimeout(resolve, 1000); }, 500),
      TimeoutError
    );

  });

  it('should support raise original error when time is enough', async () => {

    await assertShouldThrowError(
      () => createTimeoutPromise((resolve, reject) => {
        setTimeout(() => { reject(new TypeError); }, 500);
      }, 1000),
      TypeError
    );

  });

  it('should support process correct when time is enough', async () => {

    const testValue = 123456;

    const value = await createTimeoutPromise((resolve) => {
      setTimeout(() => { resolve(testValue); }, 500);
    }, 1000);

    assert.strictEqual(value, testValue);


  });


});
