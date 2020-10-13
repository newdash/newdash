import createWrap from './.internal/createWrap';

/**
 * @ignore
 * @private
 * @internal
 */
const WRAP_ARY_FLAG = 128;

/**
 * Creates a function that invokes `func`, with up to `n` arguments,
 * ignoring any additional arguments.
 *
 * @since 5.5.0
 * @category Function
 * @param func The function to cap arguments for.
 * @param n The arity cap.
 * @param guard Enables use as an iteratee for methods like `map`.
 * @returns Returns the new capped function.
 * @example
 *
 * ```js
 * map(['6', '8', '10'], ary(parseInt, 1));
 * // => [6, 8, 10]
 * ```
 */
export function ary(func: Function, n: any = func.length, guard?: any): Function {
  n = guard ? undefined : n;
  n = (func && n == null) ? func.length : n;
  // @ts-ignore
  return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
}

export default ary;
