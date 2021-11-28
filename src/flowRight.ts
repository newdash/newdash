import flow from "./flow";

/**
 * This method is like `flow` except that it composes a function that
 * invokes the given functions from right to left.
 *
 * @since 5.18.0
 * @category Util
 * @param funcs The functions to invoke.
 * @returns Returns the new composite function.
 * @see flow
 * @example
 *
 * ```ts
 * function square(n) {
 *   return n * n
 * }
 *
 * const addSquare = flowRight(square, add)
 * addSquare(1, 2)
 * // => 9
 * ```
 */
export function flowRight(...funcs: Array<Function>): Function {
  return flow(...funcs.reverse());
}

export default flowRight;
