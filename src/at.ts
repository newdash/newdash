import baseAt from './.internal/baseAt';
import baseFlatten from './.internal/baseFlatten';

/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @since 5.5.0
 * @category Object
 * @param object The object to iterate over.
 * @param paths The property paths to pick.
 * @returns Returns the picked values.
 * @example
 *
 * ```js
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 *
 * at(object, ['a[0].b.c', 'a[1]'])
 * // => [3, 4]
 * ```
 */
function at(object: any, paths: number[]): any[];
function at(object: any, paths: string[]): any[];
function at(object: any, ...paths: number[]): any[];
function at(object: any, ...paths: string[]): any[];
function at(object: any, ...paths: any[]): any[];
function at(object: any, ...paths: any[]): any[] {
  return baseAt(object, baseFlatten(paths, 1));
}

export { at };

export default at;
