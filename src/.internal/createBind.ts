// @ts-nocheck
import { WRAP_BIND_FLAG } from "./CONSTANTS";
import createCtor from "./createCtor";
import root from "./root";

export function createBind<T extends Function>(func: T, bitmask?: any, thisArg?: any): T {
  var isBind = bitmask & WRAP_BIND_FLAG,
    Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

export default createBind
