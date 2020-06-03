import createMathOperation from './.internal/createMathOperation';

const internalAdd = createMathOperation((augend: any, addend: any) => augend + addend, 0);

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
 * add('6', '4')
 * // => '64'
 * ```
 *
 */
function add<T>(augend: T, addend: T): T;
function add(augend: any, addend: any): any {
  return internalAdd(augend, addend);
}

export default add;
