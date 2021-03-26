import assert from 'assert';
import { sleep } from '../src';
import { AsyncUtils } from '../src/async';

describe('AsyncUtils Test Suite', () => {

  it('should support filter by async predicate', async () => {

    const values = await AsyncUtils.filter([1, 2, 3, 4, 5], async (value) => {
      await sleep(1);
      return (value % 2) === 0;
    });

    assert.deepStrictEqual(values, [2, 4]);

  });

  it('should support async allSettled function', async () => {
    const values = await AsyncUtils.allSettled([Promise.resolve(1), Promise.reject(2)]);
    assert.deepStrictEqual(values, [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 2 }]);
  });

  it('should support async map function', async () => {
    const values = await AsyncUtils.map([1, 2, 3], async (value) => value * value);
    assert.deepStrictEqual(values, [1, 4, 9]);
  });

});
