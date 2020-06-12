import isSymbol from "../isSymbol";

/**
 * The base implementation of methods like `max` and `min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @ignore
 * @param array The array to iterate over.
 * @param iteratee The iteratee invoked per iteration.
 * @param comparator The comparator used to compare values.
 * @returns Returns the extremum value.
 */
export function baseExtremum(array, iteratee, comparator) {
  var index = -1,
    length = array.length;

  while (++index < length) {
    var value = array[index],
      current = iteratee(value);

    if (current != null && (computed === undefined
      ? (current === current && !isSymbol(current))
      : comparator(current, computed)
    )) {
      var computed = current,
        result = value;
    }
  }
  return result;
}

export default baseExtremum
