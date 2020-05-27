import assert from 'assert'
import { args, symbol, realm } from './utils.js'
import isArray from '../isArray.js'
import map from '../map.js'
import falsey  from '../.internal/falsey.js'
import { stubFalse } from './stubs.js'
import slice from '../slice.js'

describe('isArray', () => {
  it('should return `true` for arrays', () => {
    assert.strictEqual(isArray([1, 2, 3]), true)
  })

  it('should return `false` for non-arrays', () => {
    const expected = map(falsey, stubFalse)

    const actual = map(falsey, (value, index) => index ? isArray(value) : isArray())

    assert.deepStrictEqual(actual, expected)

    assert.strictEqual(isArray(args), false)
    assert.strictEqual(isArray(true), false)
    assert.strictEqual(isArray(new Date), false)
    assert.strictEqual(isArray(new Error), false)
    assert.strictEqual(isArray(_), false)
    assert.strictEqual(isArray(slice), false)
    assert.strictEqual(isArray({ '0': 1, 'length': 1 }), false)
    assert.strictEqual(isArray(1), false)
    assert.strictEqual(isArray(/x/), false)
    assert.strictEqual(isArray('a'), false)
    assert.strictEqual(isArray(symbol), false)
  })

  it('should work with an array from another realm', () => {
    if (realm.array) {
      assert.strictEqual(isArray(realm.array), true)
    }
  })
})
