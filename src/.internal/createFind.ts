import getIteratee from "./getIteratee";
import isArrayLike from "../isArrayLike";
import keys from "../keys";

/**
 * Creates a `find` or `findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function (collection, predicate?, fromIndex?) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = getIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function (key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

export default createFind
