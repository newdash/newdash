import assert from 'assert'
import { stubString, symbol } from './utils'
import map from '../map'
import toString from "../toString";


describe('toString', () => {
  it('should treat nullish values as empty strings', () => {
    const values = [, null, undefined],
      expected = map(values, stubString)

    const actual = map(values, (value, index) => index ? toString(value) : toString())

    assert.deepStrictEqual(actual, expected)
  })

  it('should preserve the sign of `0`', () => {
    const values = [-0, Object(-0), 0, Object(0)],
      expected = ['-0', '-0', '0', '0'],
      actual = map(values, toString)

    assert.deepStrictEqual(actual, expected)
  })

  it('should preserve the sign of `0` in an array', () => {
    const values = [-0, Object(-0), 0, Object(0)]
    assert.deepStrictEqual(toString(values), '-0,-0,0,0')
  })

  it('should handle symbols', () => {
    assert.strictEqual(toString(symbol), 'Symbol(a)')
  })

  it('should handle an array of symbols', () => {
    assert.strictEqual(toString([symbol]), 'Symbol(a)')
  })

})
