
/**
 * Casts `value` as an array if it's not one.
 *
 * @since 5.0.0
 * @category Lang
 * @param value The value to inspect.
 * @returns Returns the cast array.
 * @example
 *
 * ```ts
 * castArray(1)
 * // => [1]
 *
 * castArray({ 'a': 1 })
 * // => [{ 'a': 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray(null)
 * // => [null]
 *
 * castArray(undefined)
 * // => [undefined]
 *
 * castArray()
 * // => []
 *
 * const array = [1, 2, 3]
 * console.log(castArray(array) === array)
 * // => true
 * ```
 */
export function castArray<T extends Array<any>>(array: T): T
export function castArray<T extends Array<any>>(...args: T): T {
  if (!args.length) {
    // @ts-ignore
    return [];
  }
  const value = args[0];
  // @ts-ignore
  return Array.isArray(value) ? value : [value];
}

export default castArray;
