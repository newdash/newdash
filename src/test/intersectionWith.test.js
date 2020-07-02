import assert from 'assert'
import { LARGE_ARRAY_SIZE, stubZero } from './utils'
import intersectionWith from '../intersectionWith'
import eq from '../eq'
import toString from '../toString'
import map from '../map'
import constant from '../constant'
import times from '../times'
import isEqual from '../isEqual'

describe('intersectionWith', () => {
  it('should work with a `comparator`', () => {
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
      others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }],
      actual = intersectionWith(objects, others, isEqual)

    assert.deepStrictEqual(actual, [objects[0]])
  })

  it('should preserve the sign of `0`', () => {
    const array = [-0],
      largeArray = times(LARGE_ARRAY_SIZE, stubZero),
      others = [[0], largeArray],
      expected = map(others, constant(['-0']))

    const actual = map(others, (other) => map(intersectionWith(array, other, eq), toString))

    assert.deepStrictEqual(actual, expected)
  })
})
