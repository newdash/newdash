import assert from 'assert'
import entriesIn from '../entriesIn.js'
import toPairsIn from '../toPairsIn.js'

describe('toPairsIn', () => {
  it('should be aliased', () => {
    assert.strictEqual(entriesIn, toPairsIn)
  })
})
