import assert from 'assert'
import each from '../each'
import forEach from '../forEach'

describe('forEach', () => {
  it('should be aliased', () => {
    assert.strictEqual(each, forEach)
  })
})
