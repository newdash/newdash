
/**
 * trimPrefix
 *
 * @param str to be processed string
 * @param prefix prefix string
 */
export function trimPrefix(str = '', prefix = ''): string {
  if (prefix.length > str.length) {
    return str;
  }
  if (str.startsWith(prefix)) {
    return str.substr(prefix.length);
  }
  return str;
}


export default trimPrefix;
