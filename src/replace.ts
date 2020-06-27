/**
 * Replaces matches for `pattern` in `string` with `replacement`.
 *
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 *
 * @since 5.8.0
 * @category String
 * @param string The string to modify.
 * @param pattern  The pattern to replace.
 * @param replacement The match replacement.
 * @returns Returns the modified string.
 * @see [[truncate]], [[trim]]
 * @example
 *
 * ```js
 * replace('Hi Fred', 'Fred', 'Barney')
 * // => 'Hi Barney'
 * ```
 */
export function replace(...args: any[]) {
  const string = `${args[0]}`;
  return args.length < 3 ? string : string.replace(args[1], args[2]);
}

export default replace;
