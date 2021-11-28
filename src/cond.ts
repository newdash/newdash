import getIteratee from "./.internal/getIteratee";
import arrayMap from "./.internal/arrayMap";
import baseRest from "./.internal/baseRest";
import apply from "./.internal/apply";


/**
 * @ignore
 * @private
 */
const FUNC_ERROR_TEXT = "Expected a function";

/**
 * Creates a function that iterates over `pairs` and invokes the corresponding
 * function of the first predicate to return truthy. The predicate-function
 * pairs are invoked with the `this` binding and arguments of the created
 * function.
 *
 * @since 5.12.0
 * @category Util
 * @param pairs The predicate-function pairs.
 * @returns Returns the new composite function.
 * @example
 *
 * ```js
 * const func = cond([
 *   [matches({ 'a': 1 }),         () => 'matches A'],
 *   [conforms({ 'b': isNumber }), () => 'matches B'],
 *   [() => true,                  () => 'no match']
 * ])
 *
 * func({ 'a': 1, 'b': 2 })
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 })
 * // => 'matches B'
 *
 * func({ 'a': '1', 'b': '2' })
 * // => 'no match'
 * ```
 */
export function cond<R = any>(pairs: Array<Array<[(...args: any[]) => boolean, (...args: any[]) => R]>>): R
export function cond(pairs: any): any {
  const length = pairs == null ? 0 : pairs.length,
    toIteratee = getIteratee();

  pairs = !length ? [] : arrayMap(pairs, (pair) => {
    if (typeof pair[1] != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    return [toIteratee(pair[0]), pair[1]];
  });

  return baseRest(function(args) {
    let index = -1;
    while (++index < length) {
      const pair = pairs[index];
      if (apply(pair[0], this, args)) {
        return apply(pair[1], this, args);
      }
    }
  });
}

export default cond;
