import isAsyncFunction from "../isAsyncFunction";
import isDate from "../isDate";
import type { AdvancedType, JSType } from "../types";

/**
 * must provide value with type
 *
 * @param value
 * @param fieldName
 * @param type
 */
export function mustProvide(value: any, fieldName: string, type: JSType) {

  if (value === undefined || value === null || typeof value !== type) {
    throw new TypeError(`must provide '${fieldName}' value with type '${type}', given: '${value}'/'${type}'`);
  }

}


/**
 * must provide some value
 *
 * @param value
 * @param fieldName
 * @param type
 * @returns
 */
export function mustProvideN(value: any, fieldName: string, type: AdvancedType) {
  if (
    value === undefined ||
    value === null ||
    (type === "async_function" && !isAsyncFunction(value)) ||
    (type === "date" && !isDate(value))
  ) {
    throw new TypeError(`must provide '${fieldName}' value with type '${type}', given: '${value}'/'${typeof value}'`);
  }

}
