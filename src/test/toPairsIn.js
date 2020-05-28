import assert from 'assert'
import entriesIn from '../entriesIn'
import toPairsIn from '../toPairsIn'

describe('toPairsIn', () => {
  it('should be aliased', () => {
    assert.strictEqual(entriesIn, toPairsIn)
  })
})
