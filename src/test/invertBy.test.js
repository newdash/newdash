import assert from 'assert'
import invertBy from '../invertBy'
import map from '../map'
import constant from '../constant'
import isEqual from '../isEqual'

describe('invertBy', () => {
  const object = { 'a': 1, 'b': 2, 'c': 1 }

  it('should transform keys by `iteratee`', () => {
    const expected = { 'group1': ['a', 'c'], 'group2': ['b'] }

    const actual = invertBy(object, (value) => `group${value}`)

    assert.deepStrictEqual(actual, expected)
  })

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const values = [, null, undefined],
      expected = map(values, constant({ '1': ['a', 'c'], '2': ['b'] }))

    const actual = map(values, (value, index) => index ? invertBy(object, value) : invertBy(object))

    assert.deepStrictEqual(actual, expected)
  })

  it('should only add multiple values to own, not inherited, properties', () => {
    const object = { 'a': 'hasOwnProperty', 'b': 'constructor' },
      expected = { 'hasOwnProperty': ['a'], 'constructor': ['b'] }

    assert.ok(isEqual(invertBy(object), expected))
  })

})
