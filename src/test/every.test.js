import assert from 'assert'
import identity from "../.internal/identity";
import { empties, stubTrue, stubFalse } from './utils'
import every from '../every'
import map from '../map';

describe('every', () => {

  it('should return `true` if `predicate` returns truthy for all elements', () => {
    assert.strictEqual(every([true, 1, 'a'], identity), true)
  })

  it('should return `true` for empty collections', () => {
    const expected = map(empties, stubTrue)

    const actual = map(empties, (value) => {
      try {
        return every(value, identity)
      } catch (e) {}
    })

    assert.deepStrictEqual(actual, expected)
  })

  it('should return `false` as soon as `predicate` returns falsey', () => {
    let count = 0

    assert.strictEqual(every([true, null, true], (value) => {
      count++
      return value
    }), false)

    assert.strictEqual(count, 2)
  })

  it('should work with collections of `undefined` values (test in IE < 9)', () => {
    assert.strictEqual(every([undefined, undefined, undefined], identity), false)
  })

  it('should use `_.identity` when `predicate` is nullish', () => {
    let values = [, null, undefined],
      expected = map(values, stubFalse)

    let actual = map(values, (value, index) => {
      const array = [0]
      return index ? every(array, value) : every(array)
    })

    assert.deepStrictEqual(actual, expected)

    expected = map(values, stubTrue)
    actual = map(values, (value, index) => {
      const array = [1]
      return index ? every(array, value) : every(array)
    })

    assert.deepStrictEqual(actual, expected)
  })

  it('should work with `_.property` shorthands', () => {
    const objects = [{ 'a': 0, 'b': 1 }, { 'a': 1, 'b': 2 }]
    assert.strictEqual(every(objects, 'a'), false)
    assert.strictEqual(every(objects, 'b'), true)
  })

  it('should work with `_.matches` shorthands', () => {
    const objects = [{ 'a': 0, 'b': 0 }, { 'a': 0, 'b': 1 }]
    assert.strictEqual(every(objects, { 'a': 0 }), true)
    assert.strictEqual(every(objects, { 'b': 1 }), false)
  })

  it('should work as an iteratee for methods like `_.map`', () => {
    const actual = map([[1]], every)
    assert.deepStrictEqual(actual, [true])
  })

})
