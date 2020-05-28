import assert from 'assert'
import extend from '../extend'
import assignIn from '../assignIn'

describe('assignIn', () => {
  it('should be aliased', () => {
    assert.strictEqual(extend, assignIn)
  })
})
