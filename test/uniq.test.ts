import * as assert from 'assert';
import { map } from '../src/map';
import { uniq } from '../src/uniq';

describe('uniq', () => {

  it('should perform an unsorted uniq when used as an iteratee for methods like `_.map`', () => {

    const array = [[2, 1, 2], [1, 2, 1]],
      actual = map(array, uniq);

    assert.deepStrictEqual(actual, [[2, 1], [1, 2]]);

  });

});
