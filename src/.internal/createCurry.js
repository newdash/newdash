import apply from "./apply";
import createCtor from "./createCtor";
import createHybrid from "./createHybrid";
import createRecurry from "./createRecurry";
import getHolder from "./getHolder";
import replaceHolders from "./replaceHolders";
import root from "./root";

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @internal
 * @private
 * @param func The function to wrap.
 * @param bitmask The bitmask flags. See `createWrap` for more details.
 * @param arity The arity of `func`.
 * @returns Returns the new wrapped function.
 */
export function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
      args = Array(length),
      index = length,
      placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

export default createCurry
