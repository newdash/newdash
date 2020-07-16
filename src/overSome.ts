import { createOver } from './.internal/createOver';
import { arraySome } from './.internal/arraySome';

/**
 * @ignore
 */
interface OverSomeFunction {
  (...args: any[]): boolean
}

/**
 * @ignore
 */
const internalOverSome = createOver(arraySome);

/**
 * Creates a function that checks if **any** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @since 5.11.0
 * @category Util
 * @param predicates The predicates to check.
 * @returns Returns the new function.
 * @example
 *
 * ```js
 * const func = overSome([Boolean, isFinite])
 *
 * func('1')
 * // => true
 *
 * func(null)
 * // => true
 *
 * func(NaN)
 * // => false
 * ```
 */
export function overSome(...iteratees: Array<Function>): OverSomeFunction {
  return internalOverSome(...iteratees);
}

export default overSome;
