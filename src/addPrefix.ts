
/**
 * add prefix to string
 *
 * @since 5.14.0
 * @category String
 * @param str to be processed string
 * @param prefix prefix string
 *
 * @see [[addSuffix]]
 *
 *
 * ```js
 * addPrefix("123456", "123")
 * // => '123456'
 * addPrefix("456", "123")
 * // => '123456'
 * ```
 *
 */
export function addPrefix(str: string = "", prefix: string = ""): string {
  if (!str.startsWith(prefix)) {
    return prefix + str;
  }
  return str;
}


export default addPrefix;
