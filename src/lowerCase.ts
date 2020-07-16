import words from './words';
import toString from './toString';

/**
 * @ignore
 */
const reQuotes = /['\u2019]/g;

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @since 5.6.0
 * @category String
 * @param str The string to convert.
 * @returns Returns the lower cased string.
 * @see camelCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * ```js
 * lowerCase('--Foo-Bar--')
 * // => 'foo bar'
 *
 * lowerCase('fooBar')
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__')
 * // => 'foo bar'
 * ```
 */
export function lowerCase(str: string): string {
  return words(toString(str).replace(reQuotes, '')).reduce((result, word, index) => (
    result + (index ? ' ' : '') + word.toLowerCase()
  ), '');
}

export default lowerCase;
