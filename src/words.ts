import unicodeWords from "./.internal/unicodeWords";

/**
 * @ignore
 */
const hasUnicodeWord = RegExp.prototype.test.bind(
  /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
);

/**
 * Used to match words composed of alphanumeric characters.
 * @ignore
 */
const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * @ignore
 * @param string
 */
function asciiWords(string) {
  return string.match(reAsciiWord);
}

/**
 * Splits `string` into an array of its words.
 *
 * @since 5.12.0
 * @category String
 * @param string The string to inspect.
 * @param pattern The pattern to match words.
 * @returns Returns the words of `string`.
 * @example
 *
 * ```js
 * words('fred, barney, & pebbles')
 * // => ['fred', 'barney', 'pebbles']
 *
 * words('fred, barney, & pebbles', /[^, ]+/g)
 * // => ['fred', 'barney', '&', 'pebbles']
 * ```
 */
export function words(string: string, pattern: RegExp | string = undefined): Array<string> {
  if (pattern === undefined) {
    const result = hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    return result || [];
  }
  return string.match(pattern) || [];
}

export default words;
