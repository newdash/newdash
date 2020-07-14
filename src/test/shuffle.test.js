import assert from 'assert'
import shuffle from '../shuffle'
import { times } from "../times";
import { uniqBy } from "../uniqBy";
import { sortBy } from "../sortBy";


describe('shuffle', () => {

  const array = [1, 2, 3],
    object = { 'a': 1, 'b': 2, 'c': 3 }

  it('should return a new array', () => {
    assert.notStrictEqual(shuffle(array), array)
  })

  it('should contain the same elements after a collection is shuffled', () => {
    assert.deepStrictEqual(shuffle(array).sort(), array)
    assert.deepStrictEqual(shuffle(object).sort(), array)
  })

  it('should shuffle small collections', () => {
    const actual = times(1000, () => shuffle([1, 2]))

    assert.deepStrictEqual(sortBy(uniqBy(actual, String), '0'), [[1, 2], [2, 1]])
  })

  it('should treat number values for `collection` as empty', () => {
    assert.deepStrictEqual(shuffle(1), [])
  })

})
