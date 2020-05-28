import assert from 'assert'
import eachRight from '../eachRight'
import forEachRight from '../forEachRight'

describe('forEachRight', () => {
  it('should be aliased', () => {
    assert.strictEqual(eachRight, forEachRight)
  })
})
