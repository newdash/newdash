import assert from 'assert'
import { slice, empties } from './utils'
import rearg from '../rearg'
import reject from '../reject'
import isArray from '../isArray'
import map from '../map'
import constant from '../constant'

describe('rearg', () => {
  function fn() {
    return slice.call(arguments)
  }

  it('should reorder arguments provided to `func`', () => {
    const rearged = rearg(fn, [2, 0, 1])
    assert.deepStrictEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c'])
  })

  it('should work with repeated indexes', () => {
    const rearged = rearg(fn, [1, 1, 1])
    assert.deepStrictEqual(rearged('c', 'a', 'b'), ['a', 'a', 'a'])
  })

  it('should use `undefined` for nonexistent indexes', () => {
    const rearged = rearg(fn, [1, 4])
    assert.deepStrictEqual(rearged('b', 'a', 'c'), ['a', undefined, 'c'])
  })

  it('should use `undefined` for non-index values', () => {
    const values = reject(empties, (value) => (value === 0) || isArray(value)).concat(-1, 1.1)

    const expected = map(values, constant([undefined, 'b', 'c']))

    const actual = map(values, (value) => {
      const rearged = rearg(fn, [value])
      return rearged('a', 'b', 'c')
    })

    assert.deepStrictEqual(actual, expected)
  })

  it('should not rearrange arguments when no indexes are given', () => {
    let rearged = rearg(fn)
    assert.deepStrictEqual(rearged('a', 'b', 'c'), ['a', 'b', 'c'])

    rearged = rearg(fn, [], [])
    assert.deepStrictEqual(rearged('a', 'b', 'c'), ['a', 'b', 'c'])
  })

  it('should accept multiple index arguments', () => {
    const rearged = rearg(fn, 2, 0, 1)
    assert.deepStrictEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c'])
  })

  it('should accept multiple arrays of indexes', () => {
    const rearged = rearg(fn, [2], [0, 1])
    assert.deepStrictEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c'])
  })

  it('should work with fewer indexes than arguments', () => {
    const rearged = rearg(fn, [1, 0])
    assert.deepStrictEqual(rearged('b', 'a', 'c'), ['a', 'b', 'c'])
  })

  it('should work on functions that have been rearged', () => {
    const rearged1 = rearg(fn, 2, 1, 0),
      rearged2 = rearg(rearged1, 1, 0, 2)

    assert.deepStrictEqual(rearged2('b', 'c', 'a'), ['a', 'b', 'c'])
  })
})
