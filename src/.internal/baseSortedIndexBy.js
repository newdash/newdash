import isSymbol from '../isSymbol'

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
const MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1

/**
 * The base implementation of `sortedIndexBy` and `sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
export function baseSortedIndexBy(array, value, iteratee, retHighest) {

  var low = 0,
    high = array == null ? 0 : array.length,
    valIsNaN = value !== value,
    valIsNull = value === null,
    valIsSymbol = isSymbol(value),
    valIsUndefined = value === undefined;

  if (high == 0) {
    return 0
  }

  value = iteratee(value);
  while (low < high) {
    var mid = Math.floor((low + high) / 2),
      computed = iteratee(array[mid]),
      othIsDefined = computed !== undefined,
      othIsNull = computed === null,
      othIsReflexive = computed === computed,
      othIsSymbol = isSymbol(computed);

    if (valIsNaN) {
      var setLow = retHighest || othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value);
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return Math.min(high, MAX_ARRAY_INDEX);
}

export default baseSortedIndexBy
