import repeat from '../repeat'
import baseToString from './baseToString'
import castSlice from './castSlice'
import hasUnicode from './hasUnicode'
import stringSize from './stringSize'
import stringToArray from './stringToArray'

/**
 * Creates the padding for `string` based on `length`. The `chars` string
 * is truncated if the number of characters exceeds `length`.
 *
 * @private
 * @param {number} length The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padding for `string`.
 */
function createPadding(length, chars) {
  chars = chars === undefined ? ' ' : baseToString(chars)

  const charsLength = chars.length
  if (charsLength < 2) {
    return charsLength ? repeat(chars, length) : chars
  }
  const result = repeat(chars, Math.ceil(length / stringSize(chars)))
  return hasUnicode(chars)
    ? castSlice(stringToArray(result), 0, length).join('')
    : result.slice(0, length)
}

export default createPadding
