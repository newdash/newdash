import assert from 'assert'
import { empties, stubOne, falsey, args } from './utils'
import at from '../at'
import reject from '../reject'
import transform from '../transform'
import map from '../map'
import constant from '../constant'
import isArray from '../isArray'

describe('at', () => {

  const array = ['a', 'b', 'c'],
    object = { 'a': [{ 'b': { 'c': 3 } }, 4] }

  it('should return the elements corresponding to the specified keys', () => {
    const actual = at(array, [0, 2])
    assert.deepStrictEqual(actual, ['a', 'c'])
  })

  it('should return `undefined` for nonexistent keys', () => {
    const actual = at(array, [2, 4, 0])
    assert.deepStrictEqual(actual, ['c', undefined, 'a'])
  })

  it('should work with non-index keys on array values', () => {
    const values = reject(empties, (value) => (value === 0) || isArray(value)).concat(-1, 1.1)

    const array = transform(values, (result, value) => {
      result[value] = 1
    }, [])

    const expected = map(values, stubOne),
      actual = at(array, values)

    assert.deepStrictEqual(actual, expected)
  })

  it('should return an empty array when no keys are given', () => {
    assert.deepStrictEqual(at(array), [])
    assert.deepStrictEqual(at(array, [], []), [])
  })

  it('should accept multiple key arguments', () => {
    const actual = at(['a', 'b', 'c', 'd'], 3, 0, 2)
    assert.deepStrictEqual(actual, ['d', 'a', 'c'])
  })

  it('should work with a falsey `object` when keys are given', () => {
    const expected = map(falsey, constant(Array(4).fill(undefined)))

    const actual = map(falsey, (object) => {
      try {
        return at(object, 0, 1, 'pop', 'push')
      } catch (e) { }
    })

    assert.deepStrictEqual(actual, expected)
  })

  it('should work with an `arguments` object for `object`', () => {
    const actual = at(args, [2, 0])
    assert.deepStrictEqual(actual, [3, 1])
  })

  it('should work with `arguments` object as secondary arguments', () => {
    const actual = at([1, 2, 3, 4, 5], args)
    assert.deepStrictEqual(actual, [2, 3, 4])
  })

  it('should work with an object for `object`', () => {
    const actual = at(object, ['a[0].b.c', 'a[1]'])
    assert.deepStrictEqual(actual, [3, 4])
  })

  it('should pluck inherited property values', () => {
    function Foo() {
      this.a = 1
    }
    Foo.prototype.b = 2

    const actual = at(new Foo, 'b')
    assert.deepStrictEqual(actual, [2])
  })

})
