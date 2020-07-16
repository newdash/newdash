
/**
 * Creates a function that invokes `func` with arguments reversed.
 *
 * @since 5.12.0
 * @category Function
 * @param func The function to flip arguments for.
 * @returns Returns the new flipped function.
 * @see [[reverse]]
 * @example
 *
 * ```js
 * const flipped = flip((...args) => args)
 *
 * flipped('a', 'b', 'c', 'd')
 * // => ['d', 'c', 'b', 'a']
 * ```
 */
export function flip<F extends(...args: any[]) => any>(func: F): (...args: any[]) => ReturnType<F> {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  return function(...args) {
    return func.apply(this, args.reverse());
  };
}

export default flip;
