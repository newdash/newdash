import assert from 'assert'
import { falsey, stubA, stubB, noop } from './utils'
import nth from '../nth'
import map from '../map'
import range from '../range'


describe('nth', () => {

  const array = ['a', 'b', 'c', 'd']

  it('should get the nth element of `array`', () => {
    const actual = map(array, (value, index) => nth(array, index))

    assert.deepStrictEqual(actual, array)
  })

  it('should work with a negative `n`', () => {
    const actual = map(range(1, array.length + 1), (n) => nth(array, -n))

    assert.deepStrictEqual(actual, ['d', 'c', 'b', 'a'])
  })

  it('should coerce `n` to an integer', () => {
    let values = falsey,
      expected = map(values, stubA)

    let actual = map(values, (n) => n ? nth(array, n) : nth(array))

    assert.deepStrictEqual(actual, expected)

    values = ['1', 1.6]
    expected = map(values, stubB)

    actual = map(values, (n) => nth(array, n))

    assert.deepStrictEqual(actual, expected)
  })

  it('should return `undefined` for empty arrays', () => {
    const values = [null, undefined, []],
      expected = map(values, noop)

    const actual = map(values, (array) => nth(array, 1))

    assert.deepStrictEqual(actual, expected)
  })

  it('should return `undefined` for non-indexes', () => {
    const array = [1, 2],
      values = [Infinity, array.length],
      expected = map(values, noop)

    array[-1] = 3

    const actual = map(values, (n) => nth(array, n))

    assert.deepStrictEqual(actual, expected)
  })

})
