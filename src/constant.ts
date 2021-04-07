/**
 * Creates a function that returns `value`.
 *
 *
 *
 * @since 5.0.0
 * @category Util
 * @param value The value to return from the new function.
 * @returns Returns the new constant function.
 * @example
 *
 * ```js
 * var objects = times(2, constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 * ```
 */
export function constant<T>(value?: T): () => T {
  return function () {
    return value;
  };
}

export default constant;
