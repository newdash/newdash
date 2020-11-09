import * as assert from 'assert';
import chunk from '../src/chunk';
import { isUndefined } from '../src/isUndefined';
import map from '../src/map';
import reject from '../src/reject';
import { falsey, stubArray } from './utils';

describe('chunk', () => {
  const array = [0, 1, 2, 3, 4, 5];

  it('should return chunked arrays', () => {
    const actual = chunk(array, 3);
    assert.deepStrictEqual(actual, [[0, 1, 2], [3, 4, 5]]);
  });

  it('should return the last chunk as remaining elements', () => {
    const actual = chunk(array, 4);
    assert.deepStrictEqual(actual, [[0, 1, 2, 3], [4, 5]]);
  });

  it('should treat falsey `size` values, except `undefined`, as `0`', () => {
    const expected = map(falsey, (value) => value === undefined ? [[0], [1], [2], [3], [4], [5]] : []);

    // @ts-ignore
    const actual = map(falsey, (size, index) => index ? chunk(array, size) : chunk(array));

    assert.deepStrictEqual(actual, expected);
  });

  it('should ensure the minimum `size` is `0`', () => {
    const values = reject(falsey, isUndefined).concat(-1, -Infinity),
      expected = map(values, stubArray);

    const actual = map(values, (n) => chunk(array, n));

    assert.deepStrictEqual(actual, expected);
  });

  it('should coerce `size` to an integer', () => {
    assert.deepStrictEqual(chunk(array, array.length / 4), [[0], [1], [2], [3], [4], [5]]);
  });
});
