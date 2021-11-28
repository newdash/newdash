import createMathOperation from "./.internal/createMathOperation";

/**
 * @ignore
 */
const iDivide = createMathOperation((dividend, divisor) => dividend / divisor, 1);

/**
 * Divide two numbers.
 *
 * @since 5.12.0
 * @category Math
 * @param dividend The first number in a division.
 * @param divisor The second number in a division.
 * @returns Returns the quotient.
 * @example
 *
 * ```js
 * divide(6, 4)
 * // => 1.5
 * ```
 */
export function divide(dividend: number, divisor: number): number {
  return iDivide(dividend, divisor);
}

export default divide;
