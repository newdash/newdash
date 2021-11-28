import createMathOperation from "./.internal/createMathOperation";
import map from "./map";
import isArray from "./isArray";

/**
 * @ignore
 */
const internalMultiply = createMathOperation((multiplier: any, multiplicand: any) => multiplier * multiplicand, 1);

/**
 * Multiply two numbers/array.
 *
 * @since 5.12.0
 * @category Math
 * @param multiplier The first number in a multiplication.
 * @param multiplicand The second number in a multiplication.
 * @returns Returns the product.
 * @example
 *
 * ```js
 * multiply(6, 4)
 * // => 24
 *
 * multiply(4, [1, 2, 3])
 * // => [4, 8, 12]
 *
 * multiply([1, 2], ['3', '4'])
 * // => [[1, '3'], [1, '4'], [2, '3'], [2, '4']]
 * ```
 */
export function multiply<T1, T2>(v1: Array<T1>, multiplicand: Array<T2>): Array<[T1, T2]>;
export function multiply(multiplier: Array<number>, multiplicand: number): Array<number>;
export function multiply(multiplier: Array<number>, multiplicand: any): Array<number>;
export function multiply(multiplier: number, multiplicand: Array<number>): Array<number>;
export function multiply(multiplier: any, multiplicand: Array<number>): Array<number>;
export function multiply(multiplier: number, multiplicand: number): number;
export function multiply(multiplier: any, multiplicand: any): number;
export function multiply(multiplier: any, multiplicand: any): any
export function multiply(multiplier: any, multiplicand: any): any {
  if (isArray(multiplier) && isArray(multiplicand)) {
    const rt = [];
    multiplier.forEach((v1i) => {
      multiplicand.forEach((v2i) => rt.push([v1i, v2i]));
    });
    return rt;
  } else if (isArray(multiplier) || isArray(multiplicand)) {
    const arr = isArray(multiplier) ? multiplier : multiplicand;
    const value = isArray(multiplier) ? multiplicand : multiplier;
    return map(arr, (v: any) => internalMultiply(v, value));
  }
  return internalMultiply(multiplier, multiplicand);
}

export default multiply;
