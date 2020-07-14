import arrayMap from './.internal/arrayMap';
import { createOver } from './.internal/createOver';

/**
 * @ignore
 */
const internalOver = createOver(arrayMap);

interface OverFunction {
  <T>(...args: T[]): Array<T>
  (...args: any[]): Array<any>
}

/**
 * Creates a function that invokes `iteratees` with the arguments it receives
 * and returns their results.
 *
 * @since 5.11.0
 * @category Util
 * @param iteratees The iteratees to invoke.
 * @returns Returns the new function.
 * @example
 *
 * ```js
 * const func = over([Math.max, Math.min])
 *
 * func(1, 2, 3, 4)
 * // => [4, 1]
 * ```
 */
export function over(...iteratees: Array<Function>): OverFunction {
  return internalOver(...iteratees);
}

export default over;
