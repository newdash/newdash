import toNumber from "../toNumber";
import toInteger from "../toInteger";
import { toString as ToString } from "../toString";

/**
 * Creates a function like `round`.
 *
 * @ignore
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(methodName) {
  var func = Math[methodName];
  return function (number, precision) {
    number = toNumber(number);
    precision = precision == null ? 0 : Math.min(toInteger(precision), 292);
    if (precision && isFinite(number)) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      var pair = (ToString(number) + 'e').split('e'),
        value = func(pair[0] + 'e' + (+pair[1] + precision));

      pair = (ToString(value) + 'e').split('e');
      return +(pair[0] + 'e' + (+pair[1] - precision));
    }
    return func(number);
  };
}

export default createRound
