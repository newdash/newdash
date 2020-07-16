import customDefaultsMerge from './.internal/customDefaultsMerge';
import mergeWith from './mergeWith';

/**
 * This method is like `defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see defaults
 * @example
 *
 * ```js
 * defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } })
 * // => { 'a': { 'b': 2, 'c': 3 } }
 * ```
 */
export function defaultsDeep(...args: any[]): any {
  args.push(undefined, customDefaultsMerge);
  // @ts-ignore
  return mergeWith(...args);
}

export default defaultsDeep;
