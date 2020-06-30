import assert from 'assert'
import { LARGE_ARRAY_SIZE, stubOne, stubNaN, args } from './utils'

import { difference } from "../difference";
import { differenceBy } from "../differenceBy";
import { differenceWith } from "../differenceWith";
import each from '../each';
import toString from '../toString';
import map from '../map';
import range from '../range';
import { times } from "../times";
import constant from '../constant';

describe('difference methods', () => {

  each(
    [
      ['difference', difference],
      ['differenceBy', differenceBy],
      ['differenceWith', differenceWith]
    ], ([methodName, func]) => {

      it(`\`_.${methodName}\` should return the difference of two arrays`, () => {
        const actual = func([2, 1], [2, 3])
        assert.deepStrictEqual(actual, [1])
      })

      it(`\`_.${methodName}\` should return the difference of multiple arrays`, () => {
        const actual = func([2, 1, 2, 3], [3, 4], [3, 2])
        assert.deepStrictEqual(actual, [1])
      })

      it(`\`_.${methodName}\` should treat \`-0\` as \`0\``, () => {
        const array = [-0, 0]

        let actual = map(array, (value) => func(array, [value]))

        assert.deepStrictEqual(actual, [[], []])

        actual = map(func([-0, 1], [1]), toString)
        assert.deepStrictEqual(actual, ['0'])
      })

      it(`\`_.${methodName}\` should match \`NaN\``, () => {
        assert.deepStrictEqual(func([1, NaN, 3], [NaN, 5, NaN]), [1, 3])
      })

      it(`\`_.${methodName}\` should work with large arrays`, () => {
        const array1 = range(LARGE_ARRAY_SIZE + 1),
          array2 = range(LARGE_ARRAY_SIZE),
          a = {},
          b = {},
          c = {}

        array1.push(a, b, c)
        array2.push(b, c, a)

        assert.deepStrictEqual(func(array1, array2), [LARGE_ARRAY_SIZE])
      })

      it(`\`_.${methodName}\` should work with large arrays of \`-0\` as \`0\``, () => {
        const array = [-0, 0]

        let actual = map(array, (value) => {
          const largeArray = times(LARGE_ARRAY_SIZE, constant(value))
          return func(array, largeArray)
        })

        assert.deepStrictEqual(actual, [[], []])

        const largeArray = times(LARGE_ARRAY_SIZE, stubOne)
        actual = map(func([-0, 1], largeArray), toString)
        assert.deepStrictEqual(actual, ['0'])
      })

      it(`\`_.${methodName}\` should work with large arrays of \`NaN\``, () => {
        const largeArray = times(LARGE_ARRAY_SIZE, stubNaN)
        assert.deepStrictEqual(func([1, NaN, 3], largeArray), [1, 3])
      })

      it(`\`_.${methodName}\` should work with large arrays of objects`, () => {
        const object1 = {},
          object2 = {},
          largeArray = times(LARGE_ARRAY_SIZE, constant(object1))

        assert.deepStrictEqual(func([object1, object2], largeArray), [object2])
      })

      it(`\`_.${methodName}\` should ignore values that are not array-like`, () => {
        const array = [1, null, 3]

        assert.deepStrictEqual(func(args, 3, { '0': 1 }), [1, 2, 3])
        assert.deepStrictEqual(func(null, array, 1), [])
        assert.deepStrictEqual(func(array, args, null), [null])
      })
    })
})
