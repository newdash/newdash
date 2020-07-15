import assert from 'assert'
import { _, slice, MAX_ARRAY_LENGTH, MAX_ARRAY_INDEX } from './utils'
import each from '../each'
import { sortedIndexBy } from "../sortedIndexBy";
import { sortedLastIndexBy } from "../sortedLastIndexBy";

describe('sortedIndexBy methods', () => {

  each([['sortedIndexBy', sortedIndexBy], ['sortedLastIndexBy', sortedLastIndexBy]], ([methodName, func]) => {

    const isSortedIndexBy = methodName == 'sortedIndexBy'

    it(`\`_.${methodName}\` should provide correct \`iteratee\` arguments`, () => {
      let args

      func([30, 50], 40, function () {
        args || (args = slice.call(arguments))
      })

      assert.deepStrictEqual(args, [40])
    })

    it(`\`_.${methodName}\` should work with \`_.property\` shorthands`, () => {
      const objects = [{ 'x': 30 }, { 'x': 50 }],
        actual = func(objects, { 'x': 40 }, 'x')

      assert.strictEqual(actual, 1)
    })

    it(`\`_.${methodName}\` should avoid calling iteratee when length is 0`, () => {
      const objects = [],
        actual = func(objects, { 'x': 50 }, assert.fail)

      assert.strictEqual(actual, 0)
    })

    each([Math.ceil(MAX_ARRAY_LENGTH / 2), MAX_ARRAY_LENGTH], (length) => {


      const array = [],
        values = [MAX_ARRAY_LENGTH, NaN]


      array.length = length

      each(values, (value) => {

        it(`\`_.${methodName}\` should support arrays larger than \`MAX_ARRAY_LENGTH / 2\`, value length: ${length}, value: ${value}`, () => {
          let steps = 0

          const actual = func(array, value, (value) => {
            steps++
            return value
          })

          const expected = (isSortedIndexBy ? !isNaN(value) : isFinite(value))
            ? 0
            : Math.min(length, MAX_ARRAY_INDEX)

          assert.ok(steps == 32 || steps == 33)
          assert.strictEqual(actual, expected)

        })

      })


    })

  })
})
