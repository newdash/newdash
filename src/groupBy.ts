import baseAssignValue from './.internal/baseAssignValue';
import createAggregator from './.internal/createAggregator';

/**
 * Used to check objects for own properties.
 * @ignore
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @ignore
 */
const internalGroupBy = createAggregator((result, value, key) => {
  if (hasOwnProperty.call(result, key)) {
    result[key].push(value);
  } else {
    baseAssignValue(result, key, [value]);
  }
});

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @since 5.5.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=identity] The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * ```js
 * groupBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * // The `property` iteratee shorthand.
 * groupBy(['one', 'two', 'three'], 'length');
 * // => { '3': ['one', 'two'], '5': ['three'] }
 * ```
 */
function groupBy(result, value?, key?) {
  return internalGroupBy(result, value, key);
}

export default groupBy;
