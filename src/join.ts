
const nativeJoin = Array.prototype.join;


/**
  * Converts all elements in `array` into a string separated by `separator`.
  *
  * @static
  * @since 5.0.0
  * @category Array
  * @param array The array to convert.
  * @param separator The element separator.
  * @returns Returns the joined string.
  * @example
  *
  * ```js
  * join(['a', 'b', 'c'], '~');
  * // => 'a~b~c'
  * ```
  */
export function join(array: Array<any>, separator: string = ','): string {
  return array == null ? '' : nativeJoin.call(array, separator);
}


export default join;
