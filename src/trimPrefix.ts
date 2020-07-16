
/**
 * remove prefix from string
 *
 * @since 5.5.0
 * @category String
 * @param str to be processed string
 * @param prefix prefix string
 *
 * @see [[trimSuffix]]
 *
 *
 * ```js
 * trimPrefix("123456", "123")
 * // => '456'
 * ```
 *
 */
export function trimPrefix(str: string, prefix: string): string {
  if (prefix.length > str.length) {
    return str;
  }
  if (str.startsWith(prefix)) {
    return str.substr(prefix.length);
  }
  return str;
}


export default trimPrefix;
