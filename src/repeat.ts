import toInteger from './toInteger';
import isIterateeCall from './.internal/isIterateeCall';
import toString from './toString';
import baseRepeat from './.internal/baseRepeat';

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
