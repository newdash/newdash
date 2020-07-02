import assert from 'assert'
import { LARGE_ARRAY_SIZE, stubOne } from './utils'
import differenceWith from '../differenceWith'
import isEqual from '../isEqual'
import times from '../times'
import constant from '../constant'
import map from '../map'
import eq from '../eq'
import toString from '../toString'

describe('differenceWith', () => {
  it('should work with a `comparator`', () => {
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
      actual = differenceWith(objects, [{ 'x': 1, 'y': 2 }], isEqual)

    assert.deepStrictEqual(actual, [objects[1]])
  })

  it('should preserve the sign of `0`', () => {
    const array = [-0, 1],
      largeArray = times(LARGE_ARRAY_SIZE, stubOne),
      others = [[1], largeArray],
      expected = map(others, constant(['-0']))

    const actual = map(others, (other) => map(differenceWith(array, other, eq), toString))

    assert.deepStrictEqual(actual, expected)
  })
})
