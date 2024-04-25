import baseClamp from "./.internal/baseClamp";
import baseToString from "./.internal/baseToString";
import toInteger from "./toInteger";
import toString from "./toString";

/**
 * Checks if `string` ends with the given target string.
 *
 * @since 5.7.0
 * @category String
 * @param str The string to inspect.
 * @param target The string to search for.
 * @param position The position to search up to.
 * @returns Returns `true` if `string` ends with `target`, else `false`.
 * @see [[includes]],[[startsWith]]
 * @example
 *
 * ```js
 * endsWith('abc', 'c')
 * // => true
 *
 * endsWith('abc', 'b')
 * // => false
 *
 * endsWith('abc', 'b', 2)
 * // => true
 * ```
 */
export function endsWith(str: string, target: string, position = str.length): boolean {
  const string = toString(str);
  target = baseToString(target);

  const length = string.length;
  position = position === undefined
    ? length
    : baseClamp(toInteger(position), 0, length);

  const end = position;
  position -= target.length;
  return position >= 0 && string.slice(position, end) == target;
}

export default endsWith;
