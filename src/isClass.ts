import { isEmpty } from "./isEmpty";
import { Class } from "./types";

/**
 * @ignore
 * @internal
 * @private
 */
const nativeClasses = [
  Array,
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  BigInt64Array,
  BigUint64Array,
  globalThis.SharedArrayBuffer,
  DataView,
  Date,
  BigInt,
  ArrayBuffer,
  RegExp,
  Symbol,
  Map,
  WeakMap,
  Set,
  WeakSet,
  Promise,
  Proxy,
  Number,
  String,
  Error,
  EvalError,
  RangeError
].filter((v) => v !== undefined);

/**
 * check if `value` is `Class` object
 *
 * the `Function` will return `false`
 *
 * @since 5.15.0
 * @category Lang
 *
 * @param obj
 *
 * ```js
 * class A {}
 * function a() {}
 * isClass(A) // => true
 * isClass(a) // => false
 * ```
 */
export function isClass(obj: any): obj is Class {
  if (obj === undefined || obj === null) {
    return false;
  }
  if (typeof obj === "function" && typeof obj?.constructor === "function") {
    if (/^class [\s\S]*?$/.test(Function.prototype.toString.call(obj))) {
      return true;
    }
    if (isNativeClass(obj)) {
      return true;
    }
  }
  if (typeof obj === "function" && !isEmpty(obj.prototype)) {
    return true;
  }
  return false;
}

/**
 * check a class is native class or not
 * @category Lang
 * @since 5.18.0
 * @param c class type
 */
export function isNativeClass(c: Class<any>): boolean {
  return nativeClasses.includes(c);
}
