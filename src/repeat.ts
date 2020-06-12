import toInteger from './toInteger';
import isIterateeCall from './.internal/isIterateeCall';
import floor from './floor';
import toString from './toString';


/**
 * @private
 * @ignore
 * @internal
 * @param str
 * @param n
 */
function baseRepeat(str: string, n?: number): string {
  let result = '';
  if (!str || n < 1 || n > Number.MAX_SAFE_INTEGER) {
    return result;
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
  do {
    if (n % 2) {
      result += str;
    }
    n = floor(n / 2);
    if (n) {
      str += str;
    }
  } while (n);

  return result;
}
/**
 * Repeats the given string `n` times.
 *
 * @since 5.7.0
 * @category String
 * @param str The string to repeat.
 * @param n The number of times to repeat the string.
 * @returns Returns the repeated string.
 * @example
 *
 * ```js
 * repeat('*', 3)
 * // => '***'
 *
 * repeat('abc', 2)
 * // => 'abcabc'
 *
 * repeat('abc', 0)
 * // => ''
 * ```
 */
export function repeat(str: string, n = 1, guard?: any): string {
  if ((guard ? isIterateeCall(str, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  return baseRepeat(toString(str), n);
}

export default repeat;
