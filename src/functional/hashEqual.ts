import toHashCode from "./toHashCode";

/**
 *
 * check object is equal with [[toHashCode]]
 *
 * @since 5.15.0
 * @category Functional
 * @param obj1
 * @param obj2
 */
export function hashEqual(obj1: any, obj2: any): boolean {
  return toHashCode(obj1) === toHashCode(obj2);
}
