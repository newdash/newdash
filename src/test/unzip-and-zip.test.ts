// @ts-nocheck
import assert from 'assert'
import { falsey, stubArray } from './utils'
import each from '../each'
import zip from "../zip";
import unzip from "../unzip";
import bind from "../bind";
import forOwn from '../forOwn';
import map from '../map';

describe('unzip and zip', () => {

  each([[unzip, 'unzip'], [zip, 'zip']], ([func, methodName], index) => {
    func = bind(index ? func.apply : func.call, func, null)

    const object = {
      'an empty array': [
        [],
        []
      ],
      '0-tuples': [
        [[], []],
        []
      ],
      '2-tuples': [
        [['barney', 'fred'], [36, 40]],
        [['barney', 36], ['fred', 40]]
      ],
      '3-tuples': [
        [['barney', 'fred'], [36, 40], [false, true]],
        [['barney', 36, false], ['fred', 40, true]]
      ]
    }

    forOwn(object, (pair, key) => {
      it(`\`${methodName}\` should work with ${key}`, () => {
        const actual = func(pair[0])
        assert.deepStrictEqual(actual, pair[1])
        assert.deepStrictEqual(func(actual), actual.length ? pair[0] : [])
      })
    })

    it(`\`${methodName}\` should work with tuples of different lengths`, () => {
      const pair = [
        [['barney', 36], ['fred', 40, false]],
        [['barney', 'fred'], [36, 40], [undefined, false]]
      ]

      let actual = func(pair[0])
      assert.ok('0' in actual[2])
      assert.deepStrictEqual(actual, pair[1])

      actual = func(actual)
      assert.ok('2' in actual[0])
      assert.deepStrictEqual(actual, [['barney', 36, undefined], ['fred', 40, false]])
    })

    it(`\`${methodName}\` should treat falsey values as empty arrays`, () => {
      const expected = map(falsey, stubArray)

      const actual = map(falsey, (value) => func([value, value, value]))

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`${methodName}\` should ignore values that are not arrays or \`arguments\` objects`, () => {
      const array = [[1, 2], [3, 4], null, undefined, { '0': 1 }]
      // @ts-ignore
      assert.deepStrictEqual(zip(...array), [[1, 3], [2, 4]])
    })

    it(`\`${methodName}\` should support consuming its return value`, () => {
      const expected = [['barney', 'fred'], [36, 40]]
      // @ts-ignore
      assert.deepStrictEqual(func(func(func(func(expected)))), expected)
    })

  })
})
