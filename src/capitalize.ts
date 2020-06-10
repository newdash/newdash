import upperFirst from './upperFirst';
import toString from './toString';

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @since 5.3.0
 * @category String
 * @param s The string to capitalize.
 * @returns Returns the capitalized string.
 * @example
 *
 * ```js
 * capitalize('FRED')
 * // => 'Fred'
 * ```
 */
export function capitalize(s: string): string {
  return upperFirst(toString(s).toLowerCase());
}


export default capitalize;
