
/**
 * trimSuffix
 *
 * @since 5.5.0
 *
 * @param str to be processed string
 * @param suffix string
 *
 * @see [[trimPrefix]]
 *
 */
export function trimSuffix(str = '', suffix = ''): string {
  if (suffix.length > str.length) {
    return str;
  }
  if (str.endsWith(suffix)) {
    return str.substr(0, str.length - suffix.length);
  }
  return str;
}

export default trimSuffix;
