import assert from 'assert'
import { isEven } from './utils'
import filter from '../filter'

describe('filter', () => {
  const array = [1, 2, 3]

  it('should return elements `predicate` returns truthy for', () => {
    assert.deepStrictEqual(filter(array, isEven), [2])
  })

})
