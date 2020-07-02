import assert from 'assert'
import { LARGE_ARRAY_SIZE, isEven } from './utils'
import uniqWith from '../uniqWith'
import times from '../times'
import constant from '../constant'
import isEqual from '../isEqual'
import eq from '../eq'
import toString from '../toString'
import map from '../map'

describe('uniqWith', () => {
  it('should work with a `comparator`', () => {
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }],
      actual = uniqWith(objects, isEqual)

    assert.deepStrictEqual(actual, [objects[0], objects[1]])
  })

  it('should preserve the sign of `0`', () => {
    const largeArray = times(LARGE_ARRAY_SIZE, (index) => isEven(index) ? -0 : 0)

    const arrays = [[-0, 0], largeArray],
      expected = map(arrays, constant(['-0']))

    const actual = map(arrays, (array) => map(uniqWith(array, eq), toString))

    assert.deepStrictEqual(actual, expected)
  })
})
