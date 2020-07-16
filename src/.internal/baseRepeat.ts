/**
 * @private
 * @ignore
 * @internal
 * @param str
 * @param n
 */
export function baseRepeat(str: string, n?: number): string {
  let result = '';
  if (!str || n < 1 || n > Number.MAX_SAFE_INTEGER) {
    return result;
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
  do {
    if (n % 2) {
      result += str;
    }
    n = Math.floor(n / 2);
    if (n) {
      str += str;
    }
  } while (n);

  return result;
}

export default baseRepeat
