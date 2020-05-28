import isArray from "../isArray";
import getIteratee from "./getIteratee";
import baseAggregator from "./baseAggregator";
import arrayAggregator from "./arrayAggregator";

/**
 * Creates a function like `_.groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray(collection) ? arrayAggregator : baseAggregator,
        accumulator = initializer ? initializer() : {};

    return func(collection, setter, getIteratee(iteratee, 2), accumulator);
  };
}

export default createAggregator
