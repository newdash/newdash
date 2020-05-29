/**
 * Checks if `string` starts with the given target string.
 *
 * @since 5.2.0
 * @category String
 * @param string The string to inspect.
 * @param target The string to search for.
 * @param position The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @see endsWith, includes
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
function startsWith(string: string = '', target: string, position = 0) {
  const { length } = string;
  position = position == null ? 0 : position;
  if (position < 0) {
    position = 0;
  }
  else if (position > length) {
    position = length;
  }
  target = `${target}`;
  return string.slice(position, position + target.length) == target;
}

export default startsWith;
