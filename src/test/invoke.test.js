import assert from 'assert'
import { noop, stubA, stubB, stubOne } from './utils'
import invoke from '../invoke'
import constant from '../constant'
import map from '../map'
import each from '../each'

describe('invoke', () => {

  it('should invoke a method on `object`', () => {
    const object = { 'a': constant('A') },
      actual = invoke(object, 'a')

    assert.strictEqual(actual, 'A')
  })

  it('should support invoking with arguments', () => {
    const object = { 'a': function(a, b) { return [a, b] } },
      actual = invoke(object, 'a', 1, 2)

    assert.deepStrictEqual(actual, [1, 2])
  })

  it('should not error on nullish elements', () => {
    const values = [null, undefined],
      expected = map(values, noop)

    const actual = map(values, (value) => {
      try {
        return invoke(value, 'a.b', 1, 2)
      } catch (e) {}
    })

    assert.deepStrictEqual(actual, expected)
  })

  it('should preserve the sign of `0`', () => {
    const object = { '-0': stubA, '0': stubB },
      props = [-0, Object(-0), 0, Object(0)]

    const actual = map(props, (key) => invoke(object, key))

    assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b'])
  })

  it('should support deep paths', () => {
    const object = { 'a': { 'b': function(a, b) { return [a, b] } } }

    each(['a.b', ['a', 'b']], (path) => {
      const actual = invoke(object, path, 1, 2)
      assert.deepStrictEqual(actual, [1, 2])
    })
  })

  it('should invoke deep property methods with the correct `this` binding', () => {
    const object = { 'a': { 'b': function() { return this.c }, 'c': 1 } }

    each(['a.b', ['a', 'b']], (path) => {
      assert.deepStrictEqual(invoke(object, path), 1)
    })
  })

})
