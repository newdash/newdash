import createRound from "./.internal/createRound";

/**
 * @internal
 * @private
 * @ignore
 */
const internal = createRound("round");

/**
 * Computes `number` rounded to `precision`.
 *
 * @since 4.7.0
 * @category Math
 * @param num The number to round down.
 * @param precision The precision to round down to.
 * @returns Returns the rounded down number.
 * @example
 *
 * ```js
 * round(4.006)
 * // => 4
 *
 * round(4.006, 2)
 * // => 4.01
 *
 * round(4060, -2)
 * // => 4100
 * ```
 */
export function round(num: number, precision: number = 0): number {
  return internal(num, precision);
}
export default round;
