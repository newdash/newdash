/**
 * The opposite of `before`. This method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @since 5.3.0
 * @category Function
 * @param n The number of calls before `func` is invoked.
 * @param func The function to restrict.
 * @returns Returns the new restricted function.
 * @example
 *
 * ```js
 * const saves = ['profile', 'settings']
 * const done = after(saves.length, () => console.log('done saving!'))
 *
 * forEach(saves, type => asyncSave({ 'type': type, 'complete': done }))
 * // => Logs 'done saving!' after the two async saves have completed.
 * ```
 */
export function after<T extends(...args: any[]) => any>(n: number, func: T): T {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  n = n || 0;
  // @ts-ignore
  return function(...args: any[]): any {
    if (--n < 1) {
      // @ts-ignore
      return func.apply(this, args);
    }
  };
}

export default after;
