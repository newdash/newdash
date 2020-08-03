import baseClamp from './.internal/baseClamp';
import baseToString from './.internal/baseToString';
import toInteger from './toInteger';
import toString from './toString';

/**
 * Checks if `string` starts with the given target string.
 *
 * @since 5.2.0
 * @category String
 * @param string The string to inspect.
 * @param target The string to search for.
 * @param position The position to search from.
 * @returns Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @see [[endsWith]], [[includes]]
 * @example
 *
 * ```js
 * startsWith('abc', 'a')
 * // => true
 *
 * startsWith('abc', 'b')
 * // => false
 *
 * startsWith('abc', 'b', 1)
 * // => true
 * ```
 */
export function startsWith(string: string = '', target: string, position = 0): boolean {
  string = toString(string);
  position = position == null
    ? 0
    : baseClamp(toInteger(position), 0, string.length);

  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}

export default startsWith;
