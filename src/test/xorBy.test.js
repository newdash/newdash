import assert from 'assert'
import { slice } from './utils'
import xorBy from '../xorBy'

describe('xorBy', () => {
  it('should accept an `iteratee`', () => {
    let actual = xorBy(Math.floor, [2.1, 1.2], [2.3, 3.4],)
    assert.deepStrictEqual(actual, [1.2, 3.4])

    actual = xorBy('x', [{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }])
    assert.deepStrictEqual(actual, [{ 'x': 2 }])
  })

  it('should provide correct `iteratee` arguments', () => {
    let args
    let f = function () {
      args || (args = slice.call(arguments))
    }

    xorBy(f, [2.1, 1.2], [2.3, 3.4])

    assert.deepStrictEqual(args, [2.3])
  })
})
