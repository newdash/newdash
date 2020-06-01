import createMathOperation from './.internal/createMathOperation';

const internalAdd = createMathOperation((augend, addend) => augend + addend, 0);

/**
 * Adds two numbers.
 *
 * @since 5.3.0
 * @category Math
 * @param augend The first number in an addition.
 * @param addend The second number in an addition.
 * @returns Returns the total.
 * @example
 *
 * ```js
 * add(6, 4)
 * // => 10
 * ```
 *
 */
const add = (augend: number, addend: number): number => internalAdd(augend, addend);

export default add;
