import baseGet from "./.internal/baseGet";

/**
 * The opposite of `property`s method creates a function that returns
 * the value at a given path of `object`.
 *
 * @since 5.0.0
 * @category Util
 * @param object The object to query.
 * @returns Returns the new accessor function.
 * @example
 *
 * ```js
 * const array = [0, 1, 2]
 * const object = { 'a': array, 'b': array, 'c': array }
 *
 * map(['a[2]', 'c[0]'], propertyOf(object))
 * // => [2, 0]
 *
 * map([['a', '2'], ['c', '0']], propertyOf(object))
 * // => [2, 0]
 * ```
 */
function propertyOf(object: any) {
  return (path) => object == null ? undefined : baseGet(object, path);
}

export default propertyOf;
