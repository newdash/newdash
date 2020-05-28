import assert from 'assert'
import { burredLetters, deburredLetters, comboMarks } from './utils'
import map from '../map'
import constant from '../constant'
import deburr from "../deburr";

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
