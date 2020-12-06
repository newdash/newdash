import * as assert from 'assert';
import constant from '../src/constant';
import differenceWith from '../src/differenceWith';
import eq from '../src/eq';
import isEqual from '../src/isEqual';
import map from '../src/map';
import times from '../src/times';
import toString from '../src/toString';
import { LARGE_ARRAY_SIZE, stubOne } from './utils';

describe('differenceWith', () => {
  it('should work with a `comparator`', () => {
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
      actual = differenceWith(objects, [{ 'x': 1, 'y': 2 }], isEqual);

    assert.deepStrictEqual(actual, [objects[1]]);
  });

  it('should preserve the sign of `0`', () => {
    const array = [-0, 1],
      largeArray = times(LARGE_ARRAY_SIZE, stubOne),
      others = [[1], largeArray],
      expected = map(others, constant(['-0']));

    const actual = map(others, (other) => map(differenceWith(array, other, eq), toString));

    assert.deepStrictEqual(actual, expected);
  });

  it('should return empty array when input wrong', () => {

    assert.deepStrictEqual(differenceWith(undefined), []);

  });
});
