import assert from 'assert'
import { uniq } from "../uniq";
import { map } from "../map";

describe('uniq', () => {

  it('should perform an unsorted uniq when used as an iteratee for methods like `_.map`', () => {

    const array = [[2, 1, 2], [1, 2, 1]],
      actual = map(array, uniq)

    assert.deepStrictEqual(actual, [[2, 1], [1, 2]])

  })

})
