import before from "./before";

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @since 5.15.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * ```ts
 * const initialize = once(createApplication)
 * initialize()
 * initialize()
 * // => `createApplication` is invoked once
 * ```
 */
export function once<T extends (...args: any[]) => any>(func: T): T {
  return before(2, func);
}

export default once;
