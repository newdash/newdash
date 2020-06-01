// @ts-nocheck
import assert from 'assert'
import { _, empties, LARGE_ARRAY_SIZE, slice } from './utils'
import each from '../each'
import find from '../find'
import findIndex from '../findIndex'
import findLast from '../findLast'
import findLastIndex from '../findLastIndex'
import findLastKey from '../findLastKey'
import constant from '../constant'
import map from '../map'
import reject from "../reject";
import endsWith from "../endsWith";
import isPlainObject from '../isPlainObject'

describe('find methods', () => {

  each([
    [find, 'find'],
    [findIndex, 'findIndex'],
    [findLast, 'findLast'],
    [findLastIndex, 'findLastIndex'],
    [findLastKey, 'findLastKey'],
  ], ([func, methodName]) => {
    const array = [1, 2, 3, 4]

    const objects = [
      { 'a': 0, 'b': 0 },
      { 'a': 1, 'b': 1 },
      { 'a': 2, 'b': 2 }
    ]

    const expected = ({
      'find': [objects[1], undefined, objects[2]],
      'findIndex': [1, -1, 2],
      'findKey': ['1', undefined, '2'],
      'findLast': [objects[2], undefined, objects[2]],
      'findLastIndex': [2, -1, 2],
      'findLastKey': ['2', undefined, '2']
    })[methodName]

    it(`\`_.${methodName}\` should return the found value`, () => {
      assert.strictEqual(func(objects, (object) => object.a), expected[0])
    })

    it(`\`_.${methodName}\` should return \`${expected[1]}\` if value is not found`, () => {
      assert.strictEqual(func(objects, (object) => object.a === 3), expected[1])
    })

    it(`\`_.${methodName}\` should work with \`_.matches\` shorthands`, () => {
      assert.strictEqual(func(objects, { 'b': 2 }), expected[2])
    })

    it(`\`_.${methodName}\` should work with \`_.matchesProperty\` shorthands`, () => {
      assert.strictEqual(func(objects, ['b', 2]), expected[2])
    })

    it(`\`_.${methodName}\` should work with \`_.property\` shorthands`, () => {
      assert.strictEqual(func(objects, 'b'), expected[0])
    })

    it(`\`_.${methodName}\` should return \`${expected[1]}\` for empty collections`, () => {
      const emptyValues = endsWith(methodName, 'Index') ? reject(empties, isPlainObject) : empties,
        expecting = map(emptyValues, constant(expected[1]))

      const actual = map(emptyValues, (value) => {
        try {
          return func(value, { 'a': 3 })
        } catch (e) { }
      })

      assert.deepStrictEqual(actual, expecting)
    })


  })

})
