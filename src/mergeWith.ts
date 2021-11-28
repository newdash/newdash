import baseMerge from "./.internal/baseMerge";
import createAssigner from "./.internal/createAssigner";

/**
 * @ignore
 */
const iMergeWith = createAssigner((object, source, srcIndex, customizer) => {
  baseMerge(object, source, srcIndex, customizer);
});

/**
 * This method is like `merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 5.12.0
 * @category Object
 * @param object The destination object.
 * @param sourcesOrCustomizer The source objects. The function to customize assigned values.
 * @returns Returns `object`.
 * @example
 *
 * ```js
 * function customizer(objValue, srcValue) {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue)
 *   }
 * }
 *
 * const object = { 'a': [1], 'b': [2] }
 * const other = { 'a': [3], 'b': [4] }
 *
 * mergeWith(object, other, customizer)
 * // => { 'a': [1, 3], 'b': [2, 4] }
 * ```
 */
export function mergeWith(object: any, ...sourcesOrCustomizer: any[]): any {
  return iMergeWith(object, ...sourcesOrCustomizer);
}


export default mergeWith;
