import words from "./words";
import toString from "./toString";

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @since 5.13.0
 * @category String
 * @param str The string to convert.
 * @returns {string} Returns the upper cased string.
 * @see [[camelCase]], [[kebabCase]], [[lowerCase]], [[snakeCase]], [[startCase]], [[upperFirst]]
 * @example
 *
 * ```js
 * upperCase('--foo-bar')
 * // => 'FOO BAR'
 *
 * upperCase('fooBar')
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__')
 * // => 'FOO BAR'
 * ```
 */
export function upperCase(str: string): string {
  return words(toString(str).replace(/['\u2019]/g, "")).reduce((result, word, index) => (
    result + (index ? " " : "") + word.toUpperCase()
  ), "");
}

export default upperCase;
