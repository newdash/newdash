
const nativeJoin = Array.prototype.join


/**
  * Converts all elements in `array` into a string separated by `separator`.
  *
  * @static
  * @since 0.0.4
  * @category Array
  * @param {Array} array The array to convert.
  * @param {string} [separator=','] The element separator.
  * @returns {string} Returns the joined string.
  * @example
  *
  * ```typescript
  * join(['a', 'b', 'c'], '~');
  * // => 'a~b~c'
  * ```
  */
function join(array: Array<any>, separator: string = ','): string {
  return array == null ? '' : nativeJoin.call(array, separator);
}


export default join
