
/**
 * remove suffix from string
 *
 * @since 5.5.0
 * @category String
 * @param str to be processed string
 * @param suffix string
 *
 * @see [[trimPrefix]]
 *
 * ```js
 * trimSuffix("123456789", "789")
 * // => '123456'
 * ```
 *
 */
export function trimSuffix(str: string, suffix: string): string {
  if (suffix.length > str.length) {
    return str;
  }
  if (str.endsWith(suffix)) {
    return str.substr(0, str.length - suffix.length);
  }
  return str;
}

export default trimSuffix;
