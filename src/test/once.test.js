import assert from 'assert'
import fOnce from "../once";

describe('once', () => {
  it('should invoke `func` once', () => {
    let count = 0,
      once = fOnce(() => ++count)

    once()
    assert.strictEqual(once(), 1)
    assert.strictEqual(count, 1)
  })

  it('should ignore recursive calls', () => {
    let count = 0

    var once = fOnce(() => {
      once()
      return ++count
    })

    assert.strictEqual(once(), 1)
    assert.strictEqual(count, 1)
  })

  it('should not throw more than once', () => {
    const once = fOnce(() => {
      throw new Error
    })

    assert.throws(once)

    once()
    assert.ok(true)
  })
})
