import map from './map';

/**
 * Creates a function that invokes `iteratees` with the arguments it receives
 * and returns their results.
 *
 * @since 4.0.0
 * @category Util
 * @param {Function[]} [iteratees=[identity]]
 *  The iteratees to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * ```js
 * const func = over([Math.max, Math.min])
 *
 * func(1, 2, 3, 4)
 * // => [4, 1]
 * ```
 */
function over(iteratees: Array<Function>) {
  return function(...args) {
    return map(iteratees, (iteratee) => iteratee.apply(this, args));
  };
}

export default over;
