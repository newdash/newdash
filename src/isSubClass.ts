import { isClass } from "./isClass";
import { Class } from "./types";


/**
 * check a class is the sub-class of one class
 *
 * @since 5.15.0
 * @category Function
 *
 * @param subClass
 * @param parentClass
 */
export function isSubClass(subClass: Class, parentClass: Class): boolean {
  if (isClass(subClass) && isClass(parentClass)) {
    return subClass.prototype instanceof parentClass;
  }
  return false;
}

