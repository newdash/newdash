import assert from 'assert'
import { map, constant, deburr } from '../'
import { burredLetters, deburredLetters, comboMarks } from './utils.js'

describe('deburr', () => {
  it('should convert Latin Unicode letters to basic Latin', () => {
    const actual = map(burredLetters, deburr)
    assert.deepStrictEqual(actual, deburredLetters)
  })

  it('should not deburr Latin mathematical operators', () => {
    const operators = ['\xd7', '\xf7'],
      actual = map(operators, deburr)

    assert.deepStrictEqual(actual, operators)
  })

  it('should deburr combining diacritical marks', () => {
    const expected = map(comboMarks, constant('ei'))

    const actual = map(comboMarks, (chr) => deburr(`e${chr}i`))

    assert.deepStrictEqual(actual, expected)
  })
})
