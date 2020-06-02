/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @ignore
 * @param array The array to modify.
 * @param values The values to append.
 * @returns Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
    length = values.length,
    offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

export default arrayPush;

