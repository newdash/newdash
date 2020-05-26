import assert from 'assert'
import entries from '../entries.js'
import toPairs from '../toPairs.js'

describe('toPairs', () => {
  it('should be aliased', () => {
    assert.strictEqual(entries, toPairs)
  })
})
