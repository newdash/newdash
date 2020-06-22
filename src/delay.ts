// @ts-nocheck

import isFunction from './isFunction';

/**
 * @ignore
 * @private
 * @internal
 */
const FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @since 5.7.0
 * @category Function
 * @param func The function to delay.
 * @param wait The number of milliseconds to delay invocation.
 * @param args The arguments to invoke `func` with.
 * @returns Returns the timer id.
 * @example
 *
 * ```js
 * delay(text => console.log(text), 1000, 'later')
 * // => Logs 'later' after one second.
 * ```
 */
export function delay<T extends(...args: any[]) => any>(func: T, wait: number = 0, ...args: Parameters<T>): number {
  if (!isFunction(func)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(() => { func.apply(undefined, args); }, wait);
}

export default delay;
