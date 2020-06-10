import assert from 'assert'
import lodashStable from 'lodash'
import { falsey, LARGE_ARRAY_SIZE } from './utils'
import slice from '../slice'
import each from '../each'
import map from '../map'
import constant from '../constant'

describe('slice', () => {
  const array = [1, 2, 3]

  it('should use a default `start` of `0` and a default `end` of `length`', () => {
    const actual = slice(array)
    assert.deepStrictEqual(actual, array)
    assert.notStrictEqual(actual, array)
  })

  it('should work with a positive `start`', () => {
    assert.deepStrictEqual(slice(array, 1), [2, 3])
    assert.deepStrictEqual(slice(array, 1, 3), [2, 3])
  })

  it('should work with a `start` >= `length`', () => {
    each([3, 4, Math.pow(2, 32), Infinity], (start) => {
      assert.deepStrictEqual(slice(array, start), [])
    })
  })

  it('should treat falsey `start` values as `0`', () => {
    const expected = map(falsey, constant(array))

    const actual = map(falsey, (start) => slice(array, start))

    assert.deepStrictEqual(actual, expected)
  })

  it('should work with a negative `start`', () => {
    assert.deepStrictEqual(slice(array, -1), [3])
  })

  it('should work with a negative `start` <= negative `length`', () => {
    each([-3, -4, -Infinity], (start) => {
      assert.deepStrictEqual(slice(array, start), array)
    })
  })

  it('should work with `start` >= `end`', () => {
    each([2, 3], (start) => {
      assert.deepStrictEqual(slice(array, start, 2), [])
    })
  })

  it('should work with a positive `end`', () => {
    assert.deepStrictEqual(slice(array, 0, 1), [1])
  })

  it('should work with a `end` >= `length`', () => {
    each([3, 4, Math.pow(2, 32), Infinity], (end) => {
      assert.deepStrictEqual(slice(array, 0, end), array)
    })
  })

  it('should treat falsey `end` values, except `undefined`, as `0`', () => {
    const expected = map(falsey, (value) => value === undefined ? array : [])

    const actual = map(falsey, (end, index) => index ? slice(array, 0, end) : slice(array, 0))

    assert.deepStrictEqual(actual, expected)
  })

  it('should work with a negative `end`', () => {
    assert.deepStrictEqual(slice(array, 0, -1), [1, 2])
  })

  it('should work with a negative `end` <= negative `length`', () => {
    each([-3, -4, -Infinity], (end) => {
      assert.deepStrictEqual(slice(array, 0, end), [])
    })
  })


  it('should work as an iteratee for methods like `_.map`', () => {
    const array = [[1], [2, 3]],
      actual = map(array, slice)

    assert.deepStrictEqual(actual, array)
    assert.notStrictEqual(actual, array)
  })


})
