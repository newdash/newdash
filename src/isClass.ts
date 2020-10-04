import { Class } from './types';


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
  if (obj?.constructor === Function) {
    if (/^class [\s\S]*?$/.test(obj.toString())) {
      return true;
    }
  }
  return false;
}
