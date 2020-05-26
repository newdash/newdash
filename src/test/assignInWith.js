import assert from 'assert'
import extendWith from '../extendWith.js'
import assignInWith from '../assignInWith.js'

describe('assignInWith', () => {
  it('should be aliased', () => {
    assert.strictEqual(extendWith, assignInWith)
  })
})
