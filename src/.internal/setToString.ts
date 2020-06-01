import shortOut from "./shortOut";
import baseSetToString from "./baseSetToString";

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
const setToString = shortOut(baseSetToString);

export default setToString
