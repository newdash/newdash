import createPadding from "./.internal/createPadding";
import stringSize from "./.internal/stringSize";
import toInteger from "./toInteger";
import toString from "./toString";

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @since 5.12.0
 * @category String
 * @param string The string to pad.
 * @param length The padding length.
 * @param chars The string used as padding.
 * @returns Returns the padded string.
 * @example
 *
 * ```js
 * padEnd('abc', 6)
 * // => 'abc   '
 *
 * padEnd('abc', 6, '_-')
 * // => 'abc_-_'
 *
 * padEnd('abc', 2)
 * // => 'abc'
 * ```
 */
export function padEnd(string = "", length = 0, chars = " "): string {
  string = toString(string);
  length = toInteger(length);

  const strLength = length ? stringSize(string) : 0;
  return (length && strLength < length)
    ? (string + createPadding(length - strLength, chars))
    : string;
}

export default padEnd;
