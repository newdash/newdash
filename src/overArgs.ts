import baseRest from './.internal/baseRest';
import isArray from './isArray';
import getIteratee from './.internal/getIteratee';
import baseUnary from './.internal/baseUnary';
import arrayMap from './.internal/arrayMap';
import baseFlatten from './.internal/baseFlatten';
import apply from './.internal/apply';

/**
 * @ignore
 */
const internalOverArgs = baseRest((func, transforms) => {
  transforms = (transforms.length == 1 && isArray(transforms[0]))
    ? arrayMap(transforms[0], baseUnary(getIteratee()))
    : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

  const funcsLength = transforms.length;
  return baseRest(function(args: any[]) {
    let index = -1;
    const length = Math.min(args.length, funcsLength);

    while (++index < length) {
      args[index] = transforms[index].call(this, args[index]);
    }
    return apply(func, this, args);
  });
});

/**
 * Creates a function that invokes `func` with its arguments transformed.
 *
 * @since 5.11.0
 * @category Function
 * @param func The function to wrap.
 * @param transforms The argument transforms.
 * @returns Returns the new function.
 * @example
 *
 * ```js
 * function doubled(n) {
 *   return n * 2
 * }
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const func = overArgs((x, y) => [x, y], [square, doubled])
 *
 * func(9, 3)
 * // => [81, 6]
 *
 * func(10, 5)
 * // => [100, 10]
 * ```
 */
export function overArgs(func: Function, transforms: Array<Function>): Function;
export function overArgs(...args: any[]) {
  return internalOverArgs(...args);
}

export default overArgs;
