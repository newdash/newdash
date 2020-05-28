import upperFirst from './upperFirst';
import toString from './toString';

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * capitalize('FRED')
 * // => 'Fred'
 */
const capitalize = (string) => upperFirst(toString(string).toLowerCase());


export default capitalize;
