import assert from 'assert'
import uniqueId from '../uniqueId'
import times from '../times'
import uniq from '../uniq'

describe('uniqueId', () => {
  it('should generate unique ids', () => {
    const actual = times(1000, () => uniqueId())

    assert.strictEqual(uniq(actual).length, actual.length)
  })

  it('should return a string value when not providing a `prefix`', () => {
    assert.strictEqual(typeof uniqueId(), 'string')
  })

  it('should coerce the prefix argument to a string', () => {
    const actual = [uniqueId(3), uniqueId(2), uniqueId(1)]
    assert.ok(/3\d+,2\d+,1\d+/.test(actual))
  })
})
