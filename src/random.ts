import isIterateeCall from './.internal/isIterateeCall';
import toFinite from './toFinite';

/**
 * Built-in method references without a dependency on `root`.
 * @internal
 * @ignore
 * @private
 */
const freeParseFloat = parseFloat;

/**
 * The base implementation of `random` without support for returning
 * floating-point numbers.
 *
 * @private
 * @ignore
 * @internal
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @returns  Returns the random number.
 */
function baseRandom(lower: number, upper: number): number {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

/**
 * Produces a random number between the inclusive `lower` and `upper` bounds.
 * If only one argument is provided a number between `0` and the given number
 * is returned. If `floating` is `true`, or either `lower` or `upper` are
 * floats, a floating-point number is returned instead of an integer.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @since 5.5.0
 * @category Number
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @param floating Specify returning a floating-point number.
 * @returns Returns the random number.
 * @see [[uniqueId]]
 * @example
 *
 * ```js
 * random(0, 5)
 * // => an integer between 0 and 5
 *
 * random(5)
 * // => also an integer between 0 and 5
 *
 * random(5, true)
 * // => a floating-point number between 0 and 5
 *
 * random(1.2, 5.2)
 * // => a floating-point number between 1.2 and 5.2
 * ```
 */
function random(floating?: boolean): number;
function random(upper?: number | string, floating?: boolean): number;
function random(lower?: number | string, upper?: number | string, floating?: boolean): number;
function random(lower: any = 0, upper: any = 1, floating?: boolean): number {
  if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
    upper = floating = undefined;
  }
  if (floating === undefined) {
    if (typeof upper == 'boolean') {
      floating = upper;
      upper = undefined;
    }
    else if (typeof lower == 'boolean') {
      floating = lower;
      lower = undefined;
    }
  }
  if (lower === undefined && upper === undefined) {
    lower = 0;
    upper = 1;
  }
  else {
    lower = toFinite(lower);
    if (upper === undefined) {
      upper = lower;
      lower = 0;
    } else {
      upper = toFinite(upper);
    }
  }
  if (lower > upper) {
    const temp = lower;
    lower = upper;
    upper = temp;
  }
  if (floating || lower % 1 || upper % 1) {
    const rand = Math.random();
    return Math.min(lower + (rand * (upper - lower + freeParseFloat(`1e-${(`${rand}`).length - 1}`))), upper);
  }
  return baseRandom(lower, upper);
}

export { random };

export default random;
