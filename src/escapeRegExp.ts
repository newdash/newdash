/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 * @ignore
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/**
 * @ignore
 */
const reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @since 5.12.0
 * @category String
 * @param string The string to escape.
 * @returns string Returns the escaped string.
 * @see [[escape]], [[escapeRegExp]], [[unescape]]
 * @example
 *
 * ```js
 * escapeRegExp('[lodash](https://lodash.com/)')
 * // => '\[lodash\]\(https://lodash\.com/\)'
 * ```
 */
export function escapeRegExp(string: string): string {
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : (string || '');
}

export default escapeRegExp;
