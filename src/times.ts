import baseTimes from "./.internal/baseTimes";
import getIteratee from "./.internal/getIteratee";
import toInteger from "./toInteger";

/**
 * @ignore
 * @private
 * @internal
 */
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

/**
 * @ignore
 */
const MAX_ARRAY_LENGTH = 4294967295;

/**
 * @ignore
 */
const nativeMin = Math.min;

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument: (index).
 *
 * @since 5.0.0
 * @category Util
 * @param n The number of times to invoke `iteratee`.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the array of results.
 * @example
 *
 * ```js
 * times(3, String)
 * // => ['0', '1', '2']
 *
 *  times(4, () => 0)
 * // => [0, 0, 0, 0]
 * ```
 */
export function times<T extends (...args: any[]) => any>(n: number, iteratee?: T): ReturnType<T>[]
export function times(n: any, iteratee?: any) {
  n = toInteger(n);
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return [];
  }
  let index = MAX_ARRAY_LENGTH;
  const length = nativeMin(n, MAX_ARRAY_LENGTH);
  iteratee = getIteratee(iteratee);
  n -= MAX_ARRAY_LENGTH;
  const result = baseTimes(length, iteratee);
  while (++index < n) {
    iteratee(index);
  }
  return result;
}

export default times;
