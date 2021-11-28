import customDefaultsMerge from "./.internal/customDefaultsMerge";
import mergeWith from "./mergeWith";

/**
 * This method is like `defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.21.0
 * @category Object
 * @param object The destination object.
 * @param sources The source objects.
 * @returns  Returns `object`.
 * @see [[defaults]]
 * @example
 *
 * ```js
 * defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } })
 * // => { 'a': { 'b': 2, 'c': 3 } }
 * ```
 */
export function defaultsDeep(object: any, ...args: any[]): any
export function defaultsDeep(...args: any[]): any {
  args.push(undefined, customDefaultsMerge);
  // @ts-ignore
  return mergeWith(...args);
}

export default defaultsDeep;
