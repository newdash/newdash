import { createOver } from './.internal/createOver';
import arrayEvery from './.internal/arrayEvery';

const internalOverEvery = createOver(arrayEvery);

interface OverEveryFunction {
  (...args: any[]): boolean
}

/**
 * Creates a function that checks if **all** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @since 5.11.0
 * @category Util
 * @param predicates The predicates to check.
 * @returns Returns the new function.
 * @example
 *
 * ```js
 * const func = overEvery([Boolean, isFinite])
 *
 * func('1')
 * // => true
 *
 * func(null)
 * // => false
 *
 * func(NaN)
 * // => false
 * ```
 */
export function overEvery(...iteratees: Array<Function>): OverEveryFunction {
  return internalOverEvery(...iteratees);
}

export default overEvery;
