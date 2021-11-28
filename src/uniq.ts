import baseUniq from "./.internal/baseUniq";

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @since 5.7.0
 * @category Array
 * @param array The array to inspect.
 * @returns Returns the new duplicate free array.
 * @see [[uniqBy]], [[uniqWith]]
 * @example
 *
 * ```js
 * uniq([2, 1, 2])
 * // => [2, 1]
 * ```
 */
export function uniq<T>(array: Array<T>): Array<T>;
export function uniq(array: Array<any>): Array<any>;
export function uniq(array: any): any {
  return (array != null && array.length)
    ? baseUniq(array)
    : [];
}

export default uniq;
