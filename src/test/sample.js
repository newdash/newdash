import assert from 'assert'
import lodashStable from 'lodash'
import { empties, noop } from './utils.js'
import sample from '../sample.js'

describe('sample', () => {
  const array = [1, 2, 3]

  it('should return a random element', () => {
    const actual = sample(array)
    assert.ok(lodashStable.includes(array, actual))
  })

  it('should return `undefined` when sampling empty collections', () => {
    const expected = lodashStable.map(empties, noop)

    const actual = lodashStable.transform(empties, (result, value) => {
      try {
        result.push(sample(value))
      } catch (e) {}
    })

    assert.deepStrictEqual(actual, expected)
  })

  it('should sample an object', () => {
    const object = { 'a': 1, 'b': 2, 'c': 3 },
      actual = sample(object)

    assert.ok(lodashStable.includes(array, actual))
  })
})
