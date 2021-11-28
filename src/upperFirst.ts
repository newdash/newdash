import createCaseFirst from "./.internal/createCaseFirst";

/**
 * @ignore
 */
const internalUpperFirst = createCaseFirst("toUpperCase");

/**
 * Converts the first character of `string` to upper case.
 *
 * @since 5.5.1
 * @category String
 * @param str The string to convert.
 * @returns Returns the converted string.
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperCase
 * @example
 *
 * ```js
 * upperFirst('fred')
 * // => 'Fred'
 *
 * upperFirst('FRED')
 * // => 'FRED'
 * ```
 */

export function upperFirst(str = ""): string {
  return internalUpperFirst(str);
}

export default upperFirst;
