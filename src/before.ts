// @ts-nocheck

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @since 5.5.0
 * @category Function
 * @param n The number of calls at which `func` is no longer invoked.
 * @param func The function to restrict.
 * @returns Returns the new restricted function.
 * @example
 *
 * ```js
 * jQuery(element).on('click', before(5, addContactToList))
 * // => Allows adding up to 4 contacts to the list.
 * ```
 */
export function before<T extends (...args: any[]) => any>(n: number, func: T): T {
  let result: any;
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  return function (...args) {
    if (--n > 0) {
      result = func.apply(this, args);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}


export default before;
