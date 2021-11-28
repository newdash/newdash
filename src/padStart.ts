import createPadding from "./.internal/createPadding";
import stringSize from "./.internal/stringSize";
import toInteger from "./toInteger";
import toString from "./toString";

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
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
 * padStart('abc', 6)
 * // => '   abc'
 *
 * padStart('abc', 6, '_-')
 * // => '_-_abc'
 *
 * padStart('abc', 2)
 * // => 'abc'
 * ```
 */
export function padStart(string = "", length = 0, chars = " "): string {
  string = toString(string);
  length = toInteger(length);

  const strLength = length ? stringSize(string) : 0;
  return (length && strLength < length)
    ? (createPadding(length - strLength, chars) + string)
    : string;
}

export default padStart;
