import createWrap from './.internal/createWrap';
import { WRAP_CURRY_FLAG } from './.internal/CONSTANTS';

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @since 5.5.0
 * @category Function
 * @param func The function to curry.
 * @param arity The arity of `func`.
 * @param guard Enables use as an iteratee for methods like `map`.
 * @returns Returns the new curried function.
 * @example
 *
 * ```js
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 * ```
 */
function curry(func: Function, arity: number = func.length, guard?: any): Function {
  arity = guard ? undefined : arity;
  const result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  return result;
}


export default curry;
