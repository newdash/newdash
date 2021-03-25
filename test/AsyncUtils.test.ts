import { sleep } from '../src';
import { AsyncUtils } from '../src/async';

describe('AsyncUtils Test Suite', () => {

  it('should support filter by async predicate', async () => {

    const values = await AsyncUtils.filter([1, 2, 3, 4, 5], async (value) => {
      await sleep(1);
      return (value % 2) === 0;
    });

    expect(values).toStrictEqual([2, 4]);

  });

});
