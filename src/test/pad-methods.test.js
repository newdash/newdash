import assert from 'assert'
import lodashStable from 'lodash'
import { _ } from './utils'
import pad from '../pad'
import { padEnd } from '../padEnd'
import { padStart } from '../padStart'
import each from '../each'
import map from '../map'
import constant from '../constant'



describe('pad methods', () => {
  each([['pad', pad], ['padStart', padStart], ['padEnd', padEnd]], ([methodName, func]) => {
    const isPad = methodName == 'pad'
    const isStart = methodName == 'padStart'
    let string = 'abc'

    it(`\`_.${methodName}\` should not pad if string is >= \`length\``, () => {
      assert.strictEqual(func(string, 2), string)
      assert.strictEqual(func(string, 3), string)
    })

    it(`\`_.${methodName}\` should treat negative \`length\` as \`0\``, () => {
      each([0, -2], (length) => {
        assert.strictEqual(func(string, length), string)
      })
    })

    it(`\`_.${methodName}\` should coerce \`length\` to a number`, () => {
      each(['', '4'], (length) => {
        const actual = length ? (isStart ? ' abc' : 'abc ') : string
        assert.strictEqual(func(string, length), actual)
      })
    })

    it(`\`_.${methodName}\` should treat nullish values as empty strings`, () => {
      each([undefined, '_-'], (chars) => {
        const expected = chars ? (isPad ? '__' : chars) : '  '
        assert.strictEqual(func(null, 2, chars), expected)
        assert.strictEqual(func(undefined, 2, chars), expected)
        assert.strictEqual(func('', 2, chars), expected)
      })
    })

    it(`\`_.${methodName}\` should return \`string\` when \`chars\` coerces to an empty string`, () => {
      const values = ['', Object('')],
        expected = map(values, constant(string))

      const actual = map(values, (value) => func(string, 6, value))

      assert.deepStrictEqual(actual, expected)
    })
  })
})
