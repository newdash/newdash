import assert from 'assert'
import extendWith from '../extendWith'
import assignInWith from '../assignInWith'

describe('assignInWith', () => {
  it('should be aliased', () => {
    assert.strictEqual(extendWith, assignInWith)
  })
})
