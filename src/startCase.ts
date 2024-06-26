import upperFirst from "./upperFirst";
import words from "./words";

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @since 3.1.0
 * @category String
 * @param s The string to convert.
 * @returns {string} Returns the start cased string.
 * @see camelCase, lowerCase, kebabCase, snakeCase, upperCase, upperFirst
 * @example
 *
 * startCase('--foo-bar--')
 * // => 'Foo Bar'
 *
 * startCase('fooBar')
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__')
 * // => 'FOO BAR'
 */
export function startCase(s = ""): string {
  return  words(`${s}`.replace(/['\u2019]/g, "")).reduce((result, word, index) => (
    result + (index ? " " : "") + upperFirst(word)
  ), "");
}

export default startCase;
