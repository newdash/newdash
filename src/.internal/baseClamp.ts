/**
 * @internal
 * @ignore
 * @private
 * @param number
 * @param lower
 * @param upper
 */
export function baseClamp(number: number, lower?: number, upper?: number) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

export default baseClamp
