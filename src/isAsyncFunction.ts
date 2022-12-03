import isFunction from "./isFunction";
import { AsyncFunction } from "./types";

/**
 * check given object is async function or not
 *
 * @since 5.22.0
 * @category Lang
 * @param obj
 * @returns
 */
export function isAsyncFunction(obj: any): obj is AsyncFunction {
  if (!isFunction(obj)) {
    return false;
  }
  return obj[Symbol.toStringTag] === "AsyncFunction";
}

export default isAsyncFunction;
