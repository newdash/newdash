
/**
 * @ignore
 * @private
 * @internal
 */
const FUNC_ERROR_TEXT = "Expected a function";

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @since 5.13.0
 * @category Function
 * @param predicate The predicate to negate.
 * @returns Returns the new negated function.
 * @example
 *
 * ```js
 * function isEven(n) {
 *   return n % 2 == 0
 * }
 *
 * filter([1, 2, 3, 4, 5, 6], negate(isEven))
 * // => [1, 3, 5]
 * ```
 */
export function negate(predicate) {
  if (typeof predicate != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function(...args: any[]) {
    switch (args.length) {
      case 0: return !predicate.call(this);
      case 1: return !predicate.call(this, args[0]);
      case 2: return !predicate.call(this, args[0], args[1]);
      case 3: return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}

export default negate;
