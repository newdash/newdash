import assert from 'assert'
import lodashStable from 'lodash'
import { stubString } from './utils'

import camelCase from '../camelCase'
import capitalize from '../capitalize'
import escape from '../escape'
import kebabCase from '../kebabCase'
import lowerCase from '../lowerCase'
import lowerFirst from '../lowerFirst'
import pad from '../pad'
import padEnd from '../padEnd'
import padStart from '../padStart'
import repeat from '../repeat'
import snakeCase from '../snakeCase'
import trim from '../trim'
import trimStart from '../trimStart'
import trimEnd from '../trimEnd'
import truncate from '../truncate'
import unescape from '../unescape'
import upperCase from '../upperCase'
import upperFirst from '../upperFirst'


const methods = {
  camelCase,
  capitalize,
  escape,
  kebabCase,
  lowerCase,
  lowerFirst,
  pad,
  padEnd,
  padStart,
  repeat,
  snakeCase,
  trim,
  trimStart,
  trimEnd,
  truncate,
  unescape,
  upperCase,
  upperFirst
}


describe('"Strings" category methods', () => {
  const stringMethods = [
    'camelCase',
    'capitalize',
    'escape',
    'kebabCase',
    'lowerCase',
    'lowerFirst',
    'pad',
    'padEnd',
    'padStart',
    'repeat',
    'snakeCase',
    'trim',
    'trimEnd',
    'trimStart',
    'truncate',
    'unescape',
    'upperCase',
    'upperFirst'
  ]

  lodashStable.each(stringMethods, (methodName) => {
    const func = methods[methodName]

    it(`\`_.${methodName}\` should return an empty string for empty values`, () => {
      const values = [, null, undefined, ''],
        expected = lodashStable.map(values, stubString)

      const actual = lodashStable.map(values, (value, index) => index ? func(value) : func())

      assert.deepStrictEqual(actual, expected)
    })
  })

})
