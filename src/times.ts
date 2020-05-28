import toInteger from "./toInteger";
import getIteratee from "./.internal/getIteratee";
import baseTimes from "./.internal/baseTimes";

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;

const nativeMin = Math.min;

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument: (index).
 *
 * @since 0.1.0
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * times(3, String)
 * // => ['0', '1', '2']
 *
 *  times(4, () => 0)
 * // => [0, 0, 0, 0]
 */
function times(n, iteratee) {
  n = toInteger(n);
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return [];
  }
  var index = MAX_ARRAY_LENGTH,
      length = nativeMin(n, MAX_ARRAY_LENGTH);

  iteratee = getIteratee(iteratee);
  n -= MAX_ARRAY_LENGTH;

  var result = baseTimes(length, iteratee);
  while (++index < n) {
    iteratee(index);
  }
  return result;
}

export default times;
