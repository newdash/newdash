import pullAll from './pullAll';

/**
 * Removes all given values from `array` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `without`, this method mutates `array`. Use `remove`
 * to remove elements from an array by predicate.
 *
 * @since 5.11.0
 * @category Array
 * @param array The array to modify.
 * @param values The values to remove.
 * @returns Returns `array`.
 * @see [[pullAll]], [[pullAllBy]], [[pullAllWith]], [[pullAt]], [[remove]], [[reject]]
 * @example
 *
 * ```js
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pull(array, 'a', 'c')
 * console.log(array)
 * // => ['b', 'b']
 * ```
 */
export function pull<T>(array: Array<T>, ...values: T[]): Array<T> {
  return pullAll(array, values);
}

export default pull;
