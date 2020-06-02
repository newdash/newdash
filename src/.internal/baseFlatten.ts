import isFlattenable from './isFlattenable'
import arrayPush from './arrayPush';

/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @private
 * @ignore
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {(value:any)=>boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth?, predicate?, isStrict?, result?) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

export default baseFlatten
