import assert from 'assert'
import xorWith from '../xorWith'
import isEqual from '../isEqual'

describe('xorWith', () => {

  it('should work with a `comparator`', () => {
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
      others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }],
      actual = xorWith(isEqual, objects, others)

    assert.deepStrictEqual(actual, [objects[1], others[0]])
  })

})
