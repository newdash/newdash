import assert from 'assert'
import { args } from './utils'
import flatten from '../flatten'
import flattenDeep from '../flattenDeep'
import flattenDepth from '../flattenDepth'
import each from '../each'
import map from '../map'
import constant from '../constant'
import keys from '../keys'


describe('flatten methods', () => {
  const array = [1, [2, [3, [4]], 5]],
    methods = [
      [flatten, 'flatten'],
      [flattenDeep, 'flattenDeep'],
      [flattenDepth, 'flattenDepth']
    ]

  it('should flatten `arguments` objects', () => {
    const array = [args, [args]]

    assert.deepStrictEqual(flatten(array), [1, 2, 3, args])
    assert.deepStrictEqual(flattenDeep(array), [1, 2, 3, 1, 2, 3])
    assert.deepStrictEqual(flattenDepth(array, 2), [1, 2, 3, 1, 2, 3])
  })

  it('should treat sparse arrays as dense', () => {
    const array = [[1, 2, 3], Array(3)],
      expected = [1, 2, 3]

    expected.push(undefined, undefined, undefined)

    each(methods, ([func, methodName]) => {
      // @ts-ignore
      const actual = func(array)
      assert.deepStrictEqual(actual, expected)
      assert.ok('4' in actual)
    })
  })

  it('should flatten objects with a truthy `Symbol.isConcatSpreadable` value', () => {
    if (Symbol && Symbol.isConcatSpreadable) {
      const object = { '0': 'a', 'length': 1 },
        array = [object],
        expected = map(methods, constant(['a']))

      object[Symbol.isConcatSpreadable] = true

      // @ts-ignore
      const actual = map(methods, ([func]) => func(array))

      assert.deepStrictEqual(actual, expected)
    }
  })

  methods.forEach(([func, name]) => {
    it(`should work with extremely large arrays for "${name}"`, () => {

      const expected = Array(100).fill(undefined); // fill undefined, otherwise the object internal not have these items.

      // @ts-ignore
      const actual = func([expected])

      assert.deepStrictEqual(typeof actual, typeof expected)
      // @ts-ignore
      assert.deepStrictEqual(actual.prototype, expected.prototype)
      assert.deepStrictEqual(actual.length, expected.length)
      assert.deepStrictEqual(keys(actual), keys(expected))
      assert.deepStrictEqual(actual, expected)

    })

  })


  it('should work with empty arrays', () => {
    const array = [[], [[]], [[], [[[]]]]]

    assert.deepStrictEqual(flatten(array), [[], [], [[[]]]])
    assert.deepStrictEqual(flattenDeep(array), [])
    assert.deepStrictEqual(flattenDepth(array, 2), [[[]]])
  })

  it('should support flattening of nested arrays', () => {
    assert.deepStrictEqual(flatten(array), [1, 2, [3, [4]], 5])
    assert.deepStrictEqual(flattenDeep(array), [1, 2, 3, 4, 5])
    assert.deepStrictEqual(flattenDepth(array, 2), [1, 2, 3, [4], 5])
  })

  it('should return an empty array for non array-like objects', () => {
    const expected = [],
      nonArray = { '0': 'a' }

    // @ts-ignore
    assert.deepStrictEqual(flatten(nonArray), expected)
    // @ts-ignore
    assert.deepStrictEqual(flattenDeep(nonArray), expected)
    // @ts-ignore
    assert.deepStrictEqual(flattenDepth(nonArray, 2), expected)
  })

})
