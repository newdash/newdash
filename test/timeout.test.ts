import { createTimeoutPromise, TimeoutError } from '../src/timeout';

describe('Timeout Test Suite', () => {


  it('should support raise error on timeout', async() => {

    await expect(() => createTimeoutPromise((resolve) => { setTimeout(resolve, 1000); }, 500)).rejects.toThrow(TimeoutError);

  });

  it('should support raise original error when time is enough', async() => {

    await expect(
      () => createTimeoutPromise((resolve, reject) => {
        setTimeout(() => { reject(new TypeError); }, 500);
      }, 1000)
    ).rejects.toThrow(TypeError);

  });

  it('should support process correct when time is enough', async() => {

    const testValue = 123456;

    const value = await createTimeoutPromise((resolve) => {
      setTimeout(() => { resolve(testValue); }, 500);
    }, 1000);

    expect(value).toBe(testValue);


  });


});
