/**
 * Used to map HTML entities to characters.
 * @ignore
 */
const htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};

/**
 * Used to match HTML entities and HTML characters.
 * @ignore
 */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g;

/**
 * @ignore
 */
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

/**
 * The inverse of `escape`this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @since 5.12.0
 * @category String
 * @param string The string to unescape.
 * @returns string Returns the unescaped string.
 * @see [[escape]], [[escapeRegExp]]
 * @example
 *
 * ```js
 * unescape('fred, barney, &amp; pebbles')
 * // => 'fred, barney, & pebbles'
 * ```
 */
export function unescape(string: string): string {
  return (string && reHasEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'"))
    : (string || "");
}

export default unescape;
