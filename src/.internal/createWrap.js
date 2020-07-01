import toInteger from "../toInteger";
import nativeMax from "./nativeMax"
import getData from "./getData"
import { WRAP_BIND_KEY_FLAG, WRAP_PARTIAL_RIGHT_FLAG, WRAP_PARTIAL_FLAG, WRAP_CURRY_FLAG, WRAP_BIND_FLAG, FUNC_ERROR_TEXT, WRAP_CURRY_RIGHT_FLAG } from "./CONSTANTS"
import createPartial from "./createPartial";
import baseSetData from "./baseSetData";
import setData from "./setData"
import setWrapToString from "./setWrapToString";
import createHybrid from "./createHybrid";
import mergeData from "./mergeData";
import createBind from "./createBind";
import createCurry from "./createCurry";

/**
  * Creates a function that either curries or invokes `func` with optional
  * `this` binding and partially applied arguments.
  *
  * @private
  * @param {Function|string} func The function or method name to wrap.
  * @param {number} bitmask The bitmask flags.
  *    1 - `bind`
  *    2 - `bindKey`
  *    4 - `curry` or `curryRight` of a bound function
  *    8 - `curry`
  *   16 - `curryRight`
  *   32 - `partial`
  *   64 - `partialRight`
  *  128 - `rearg`
  *  256 - `ary`
  *  512 - `flip`
  * @param {*} [thisArg] The `this` binding of `func`.
  * @param {Array} [partials] The arguments to be partially applied.
  * @param {Array} [holders] The `partials` placeholder indexes.
  * @param {Array} [argPos] The argument positions of the new function.
  * @param {number} [ary] The arity cap of `func`.
  * @param {number} [arity] The arity of `func`.
  * @returns {Function} Returns the new wrapped function.
  */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
      holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  }
  let result
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

export default createWrap
