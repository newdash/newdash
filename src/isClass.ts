import { Class } from './types';

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
  SharedArrayBuffer,
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
  if (typeof obj?.constructor === 'function') {
    if (/^class [\s\S]*?$/.test(obj.toString())) {
      return true;
    }
    if (nativeClasses.includes(obj)) {
      return true;
    }
  }
  return false;
}
