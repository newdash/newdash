import assert from 'assert'
import entries from '../entries'
import toPairs from '../toPairs'

describe('toPairs', () => {
  it('should be aliased', () => {
    assert.strictEqual(entries, toPairs)
  })
})
