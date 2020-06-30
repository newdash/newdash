import SetCache from './SetCache'
import arrayIncludes from './arrayIncludes'
import arrayIncludesWith from './arrayIncludesWith'
import cacheHas from './cacheHas'
import arrayMap from './arrayMap'

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/**
 * @private
 * @ignore
 * @internal
 * @param {*} func
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * The base implementation of methods like `difference` without support
 * for excluding multiple arrays.
 *
 * @private
 * @param array The array to inspect.
 * @param values The values to exclude.
 * @param iteratee The iteratee invoked per element.
 * @param comparator The comparator invoked per element.
 * @returns Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee = undefined, comparator = undefined) {
  var index = -1,
    includes = arrayIncludes,
    isCommon = true,
    length = array.length,
    result = [],
    valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
      computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

export default baseDifference
