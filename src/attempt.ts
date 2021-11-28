import isError from "./isError";

/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it's invoked.
 *
 * @since 5.3.0
 * @category Util
 * @param func The function to attempt.
 * @param args The arguments to invoke `func` with.
 * @returns Returns the `func` result or error object.
 * @example
 *
 * ```js
 * // Avoid throwing errors for invalid selectors.
 * const elements = attempt(selector =>
 *   document.querySelectorAll(selector), '>_>')
 *
 * if (isError(elements)) {
 *   elements = []
 * }
 * ```
 */
export function attempt<T extends(...args: any[]) => any>(func: T, ...args: any[]): ReturnType<T> | Error {
  try {
    return func(...args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
}

export default attempt;
