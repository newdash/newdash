import * as assert from 'assert';
import map from '../src/map';
import dropRight from '../src/dropRight';
import each from '../src/each';
import falsey from '../src/.internal/falsey';


describe('dropRight', () => {
  const array = [1, 2, 3];

  it('should drop the last two elements', () => {
    assert.deepStrictEqual(dropRight(array, 2), [1]);
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', () => {
    const expected = map(falsey, (value) => value === undefined ? [1, 2] : array);

    const actual = map(falsey, (n) => dropRight(array, n));

    assert.deepStrictEqual(actual, expected);
  });

  it('should return all elements when `n` < `1`', () => {
    each([0, -1, -Infinity], (n) => {
      assert.deepStrictEqual(dropRight(array, n), array);
    });
  });

  it('should return an empty array when `n` >= `length`', () => {
    each([3, 4, Math.pow(2, 32), Infinity], (n) => {
      assert.deepStrictEqual(dropRight(array, n), []);
    });
  });

  it('should coerce `n` to an integer', () => {
    assert.deepStrictEqual(dropRight(array, 1.6), [1, 2]);
  });

});
