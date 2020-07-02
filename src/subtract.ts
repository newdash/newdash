import createMathOperation from './.internal/createMathOperation';

/**
 * @ignore
 * @private
 * @internal
 */
const internal = createMathOperation((minuend, subtrahend) => minuend - subtrahend, 0);

/**
 * Subtract two numbers.
 *
 * @since 5.10.0
 * @category Math
 * @param minuend The first number in a subtraction.
 * @param subtrahend The second number in a subtraction.
 * @returns Returns the difference.
 * @example
 *
 * ```js
 * subtract(6, 4)
 * // => 2
 * ```
 */
export function subtract(minuend: string, subtrahend: string): number;
export function subtract(minuend: number, subtrahend: number): number;
export function subtract<T>(minuend: T, subtrahend: T): T;
export function subtract(minuend: any, subtrahend: any): any {
  return internal(minuend, subtrahend);
};

export default subtract;
