import toString from "./toString";

/**
 * Converts `string`, as a whole, to upper case just like
 * [String#toUpperCase](https://mdn.io/toUpperCase).
 *
 * @since 5.12.0
 * @category String
 * @param value The string to convert.
 * @returns Returns the upper cased string.
 * @example
 *
 * ```js
 * _.toUpper('--foo-bar--');
 * // => '--FOO-BAR--'
 *
 * _.toUpper('fooBar');
 * // => 'FOOBAR'
 *
 * _.toUpper('__foo_bar__');
 * // => '__FOO_BAR__'
 * ```
 */
export function toUpper(value: string): string {
  return toString(value).toUpperCase();
}

export default toUpper;
