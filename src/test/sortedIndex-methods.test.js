import assert from 'assert'
import { _ } from './utils'
import sortBy from '../sortBy'
import each from '../each'
import map from '../map'
import constant from '../constant'
import { sortedIndex } from "../sortedIndex";
import { sortedLastIndex } from "../sortedLastIndex";

describe('sortedIndex methods', () => {
  each([['sortedIndex', sortedIndex], ['sortedLastIndex', sortedLastIndex]], ([methodName, func]) => {
    const isSortedIndex = methodName == 'sortedIndex'

    it(`\`_.${methodName}\` should return the insert index`, () => {
      const array = [30, 50],
        values = [30, 40, 50],
        expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2]

      const actual = map(values, (value) => func(array, value))

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should work with an array of strings`, () => {
      const array = ['a', 'c'],
        values = ['a', 'b', 'c'],
        expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2]

      const actual = map(values, (value) => func(array, value))

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should accept a nullish \`array\` and a \`value\``, () => {
      const values = [null, undefined],
        expected = map(values, constant([0, 0, 0]))

      const actual = map(values, (array) => [func(array, 1), func(array, undefined), func(array, NaN)])

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should align with \`_.sortBy\``, () => {
      const symbol1 = Symbol ? Symbol('a') : null,
        symbol2 = Symbol ? Symbol('b') : null,
        symbol3 = Symbol ? Symbol('c') : null,
        expected = [1, '2', {}, symbol1, symbol2, null, undefined, NaN, NaN]

      each([
        [NaN, symbol1, null, 1, '2', {}, symbol2, NaN, undefined],
        ['2', null, 1, symbol1, NaN, {}, NaN, symbol2, undefined]
      ], (array) => {
        assert.deepStrictEqual(sortBy(array), expected)
        assert.strictEqual(func(expected, 3), 2)
        assert.strictEqual(func(expected, symbol3), isSortedIndex ? 3 : (Symbol ? 5 : 6))
        assert.strictEqual(func(expected, null), isSortedIndex ? (Symbol ? 5 : 3) : 6)
        assert.strictEqual(func(expected, undefined), isSortedIndex ? 6 : 7)
        assert.strictEqual(func(expected, NaN), isSortedIndex ? 7 : 9)
      })
    })

    it(`\`_.${methodName}\` should align with \`_.sortBy\` for nulls`, () => {
      const array = [null, null]

      assert.strictEqual(func(array, null), isSortedIndex ? 0 : 2)
      assert.strictEqual(func(array, 1), 0)
      assert.strictEqual(func(array, 'a'), 0)
    })

    it(`\`_.${methodName}\` should align with \`_.sortBy\` for symbols`, () => {
      const symbol1 = Symbol ? Symbol('a') : null,
        symbol2 = Symbol ? Symbol('b') : null,
        symbol3 = Symbol ? Symbol('c') : null,
        array = [symbol1, symbol2]

      assert.strictEqual(func(array, symbol3), isSortedIndex ? 0 : 2)
      assert.strictEqual(func(array, 1), 0)
      assert.strictEqual(func(array, 'a'), 0)
    })
  })
})
