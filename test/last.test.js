import * as assert from 'assert';
import last from '../src/last';
import { map } from '../src/map';

describe('last', () => {

  const array = [1, 2, 3, 4];

  it('should return the last element', () => {
    assert.strictEqual(last(array), 4);
  });

  it('should return `undefined` when querying empty arrays', () => {
    const array = [];
    array['-1'] = 1;

    assert.strictEqual(last([]), undefined);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      actual = map(array, last);

    assert.deepStrictEqual(actual, [3, 6, 9]);
  });


});
