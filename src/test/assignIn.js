import assert from 'assert'
import extend from '../extend.js'
import assignIn from '../assignIn.js'

describe('assignIn', () => {
  it('should be aliased', () => {
    assert.strictEqual(extend, assignIn)
  })
})
