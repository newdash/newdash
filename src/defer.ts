// @ts-nocheck

/**
 * Defers invoking the `func` until the current call stack has cleared. Any
 * additional arguments are provided to `func` when it's invoked.
 *
 * @since 5.7.0
 * @category Function
 * @param func The function to defer.
 * @param args The arguments to invoke `func` with.
 * @returns Returns the timer id.
 * @example
 *
 * ```js
 * defer(text => console.log(text), 'deferred')
 * // => Logs 'deferred' after one millisecond.
 * ```
 */
export function defer<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): number {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  return setTimeout(func, 1, ...args);
}

export default defer;
