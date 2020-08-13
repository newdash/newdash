
/**
 * add suffix to string
 *
 * @since 5.14.0
 * @category String
 * @param str to be processed string
 * @param suffix prefix string
 *
 * @see [[addPrefix]]
 *
 *
 * ```js
 * addSuffix("123456", "456")
 * // => '123456'
 * addSuffix("123", "123")
 * // => '123456'
 * ```
 *
 */
export function addSuffix(str: string = '', suffix: string = ''): string {
  if (!str.endsWith(suffix)) {
    return str + suffix;
  }
  return str;
}

export const appendSuffix = addSuffix;

export default addSuffix;
