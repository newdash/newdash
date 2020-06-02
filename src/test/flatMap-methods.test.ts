// @ts-nocheck
import assert from 'assert';
import constant from '../constant';
import each from '../each';
import flatMap from "../flatMap";
import flatMapDeep from "../flatMapDeep";
import flatMapDepth from "../flatMapDepth";
import flatten from '../flatten';
import map from '../map';
import { falsey, stubArray } from './utils';
import identity from '../.internal/identity';

describe('flatMap methods', () => {

  each([[flatMap, 'flatMap'], [flatMapDeep, 'flatMapDeep'], [flatMapDepth, 'flatMapDepth']], ([func, methodName]) => {
    const array = [1, 2, 3, 4]

    function duplicate(n) {
      return [n, n]
    }

    it(`\`_.${methodName}\` should map values in \`array\` to a new flattened array`, () => {
      const actual = func(array, duplicate),
        expected = flatten(map(array, duplicate))

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should work with \`_.property\` shorthands`, () => {
      const objects = [{ 'a': [1, 2] }, { 'a': [3, 4] }]
      assert.deepStrictEqual(func(objects, 'a'), array)
    })

    it(`\`_.${methodName}\` should iterate over own string keyed properties of objects`, () => {
      function Foo() {
        this.a = [1, 2]
      }
      Foo.prototype.b = [3, 4]

      const actual = func(new Foo, identity)
      assert.deepStrictEqual(actual, [1, 2])
    })

    it(`\`_.${methodName}\` should use \`_.identity\` when \`iteratee\` is nullish`, () => {
      const array = [[1, 2], [3, 4]],
        object = { 'a': [1, 2], 'b': [3, 4] },
        values = [, null, undefined],
        expected = map(values, constant([1, 2, 3, 4]))

      each([array, object], (collection) => {
        const actual = map(values, (value, index) => index ? func(collection, value) : func(collection))

        assert.deepStrictEqual(actual, expected)
      })
    })

    it(`\`_.${methodName}\` should accept a falsey \`collection\``, () => {
      const expected = map(falsey, stubArray)

      const actual = map(falsey, (collection, index) => {
        try {
          return index ? func(collection) : func()
        } catch (e) { }
      })

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should treat number values for \`collection\` as empty`, () => {
      assert.deepStrictEqual(func(1), [])
    })

    it(`\`_.${methodName}\` should work with objects with non-number length properties`, () => {
      const object = { 'length': [1, 2] }
      assert.deepStrictEqual(func(object, identity), [1, 2])
    })
  })
})
