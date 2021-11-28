import createCaseFirst from "./.internal/createCaseFirst";


/**
 * @ignore
 * @private
 * @internal
 */
const internal = createCaseFirst("toLowerCase");
/**
 * Converts the first character of `string` to lower case.
 *
 * @since 5.7.0
 * @category String
 * @param str The string to convert.
 * @returns Returns the converted string.
 * @example
 *
 * ```js
 * lowerFirst('Fred')
 * // => 'fred'
 *
 * lowerFirst('FRED')
 * // => 'fRED'
 * ```
 */
export function lowerFirst(str: string = ""): string {
  return internal(str);
}

export default lowerFirst;
