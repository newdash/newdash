import createPadding from "./.internal/createPadding";
import stringSize from "./.internal/stringSize";
import toInteger from "./toInteger";
import toString from "./toString";

/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
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
 * pad('abc', 8)
 * // => '  abc   '
 *
 * pad('abc', 8, '_-')
 * // => '_-abc_-_'
 *
 * pad('abc', 2)
 * // => 'abc'
 * ```
 */
export function pad(string = "", length = 0, chars = " "): string {
  string = toString(string);
  length = toInteger(length);

  const strLength = length ? stringSize(string) : 0;
  if (!length || strLength >= length) {
    return string;
  }
  const mid = (length - strLength) / 2;
  return (
    createPadding(Math.floor(mid), chars) +
    string +
    createPadding(Math.ceil(mid), chars)
  );
}

export default pad;
