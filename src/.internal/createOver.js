import flatRest from "./flatRest";
import arrayMap from "./arrayMap";
import baseUnary from "./baseUnary";
import getIteratee from "./getIteratee";
import baseRest from "./baseRest";
import apply from "./apply";


export function createOver(arrayFunc) {
  return flatRest(function (iteratees) {
    iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
    return baseRest(function (args) {
      var thisArg = this;
      return arrayFunc(iteratees, function (iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}
