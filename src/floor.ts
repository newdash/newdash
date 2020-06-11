import createRound from './.internal/createRound';


/**
 * @internal
 * @private
 * @ignore
 */
const internal = createRound('floor');

/**
 * Computes `number` rounded down to `precision`.
 *
 * @since 5.7.0
 * @category Math
 * @param num The number to round down.
 * @param precision The precision to round down to.
 * @returns Returns the rounded down number.
 * @example
 *
 * ```js
 * floor(4.006)
 * // => 4
 *
 * floor(0.046, 2)
 * // => 0.04
 *
 * floor(4060, -2)
 * // => 4000
 * ```
 */
export function floor(num: number, precision: number = 0): number {
  return internal(num, precision);
}

export default floor;
