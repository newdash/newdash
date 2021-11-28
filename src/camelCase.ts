import upperFirst from "./upperFirst";
import words from "./words";
import toString from "./toString";

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @since 5.5.0
 * @category String
 * @param s The string to convert.
 * @returns Returns the camel cased string.
 * @see [[lowerCase]], [[kebabCase]], [[snakeCase]], [[startCase]], [[upperCase]], [[upperFirst]]
 * @example
 *
 * ```js
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 * ```
 */
export function camelCase(s: string): string {
  return words(toString(s).replace(/['\u2019]/g, "")).reduce((result: string, word: string, index: number) => {
    word = word.toLowerCase();
    return result + (index ? upperFirst(word) : word);
  }, "");
}

export default camelCase;
