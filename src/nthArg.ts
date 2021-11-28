// @ts-nocheck
import nth from "./nth";

/**
 * Creates a function that gets the argument at index `n`. If `n` is negative,
 * the nth argument from the end is returned.
 *
 * @since 5.10.0
 * @category Util
 * @param n The index of the argument to return.
 * @returns {Function} Returns the new pass-thru function.
 * @example
 *
 * ```js
 * const func = nthArg(1)
 * func('a', 'b', 'c', 'd')
 * // => 'b'
 *
 * const func = nthArg(-2)
 * func('a', 'b', 'c', 'd')
 * // => 'c'
 * ```
 */
export function nthArg(n = 0): typeof nth {
  return (...args) => nth(args, n);
}

export default nthArg;
