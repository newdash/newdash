import createRound from "./.internal/createRound";


/**
 * @ignore
 * @private
 * @internal
 */
const internalCeil = createRound("ceil");

/**
 * Computes `number` rounded up to `precision`.
 * (Round up: the smallest integer greater than or equal to a given number.)
 *
 * @since 5.5.0
 * @category Math
 * @param number The number to round up.
 * @param precision The precision to round up to.
 * @returns Returns the rounded up number.
 * @example
 *
 * ```
 * ceil(4.006)
 * // => 5
 *
 * ceil(6.004, 2)
 * // => 6.01
 *
 * ceil(6040, -2)
 * // => 6100
 * ```
 */
export function ceil(number: number, precision: number = 0): number {
  return internalCeil(number, precision);
}

export default ceil;
