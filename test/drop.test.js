import * as assert from 'assert';
import map from '../src/map';
import drop from '../src/drop';
import each from '../src/each';
import falsey from '../src/.internal/falsey';

describe('drop', () => {
  const array = [1, 2, 3];

  it('should drop the first two elements', () => {
    assert.deepStrictEqual(drop(array, 2), [3]);
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', () => {
    const expected = map(falsey, (value) => value === undefined ? [2, 3] : array);

    const actual = map(falsey, (n) => drop(array, n));

    assert.deepStrictEqual(actual, expected);
  });

  it('should return all elements when `n` < `1`', () => {
    each([0, -1, -Infinity], (n) => {
      assert.deepStrictEqual(drop(array, n), array);
    });
  });

  it('should return an empty array when `n` >= `length`', () => {
    each([3, 4, Math.pow(2, 32), Infinity], (n) => {
      assert.deepStrictEqual(drop(array, n), []);
    });
  });

  it('should coerce `n` to an integer', () => {
    assert.deepStrictEqual(drop(array, 1.6), [2, 3]);
  });

});
