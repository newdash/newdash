import toNumber from './toNumber';

/**
 * @internal
 * @ignore
 * @private
 * @param number
 * @param lower
 * @param upper
 */
function baseClamp(number: number, lower?: number, upper?: number) {
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

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @since 5.7.0
 * @category Number
 * @param  num The number to clamp.
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @returns Returns the clamped number.
 * @example
 *
 * ```js
 * clamp(-10, -5, 5)
 * // => -5
 *
 * clamp(10, -5, 5)
 * // => 5
 * ```
 */
export function clamp(num: number, lower?: number, upper?: number): number {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }
  if (upper !== undefined) {
    upper = toNumber(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== undefined) {
    lower = toNumber(lower);
    lower = lower === lower ? lower : 0;
  }
  return baseClamp(toNumber(num), lower, upper);
}

export default clamp;
