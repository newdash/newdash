
import { Class } from "./types";


/**
 * is instance of a class
 *
 * @since 5.16.0
 * @category Lang
 * @param inst
 * @param aClass
 */
export function isInstance<T>(inst: any, aClass: Class<T>): inst is T {
  return inst instanceof aClass;
}
