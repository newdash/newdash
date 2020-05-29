import baseMerge from './.internal/baseMerge';
import createAssigner from './.internal/createAssigner';

const internalMerge = createAssigner((object, source, srcIndex) => {
  baseMerge(object, source, srcIndex);
});

/**
 * This method is like `assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 0.0.3
 * @category Object
 * @param object The destination object.
 * @param sources The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * ```js
 * const object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * }
 *
 * const other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * }
 *
 * merge(object, other)
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 * ```
 */
function merge<A, B, C, D>(target: A, s1: B, s2: C, s3: D): A & B & C & D;
function merge<A, B, C>(target: A, s1: B, s2: C): A & B & C;
function merge<A, B>(target: A, s1: B): A & B;
function merge(target?: any, ...sources: any[]) {
  return internalMerge(target, ...sources);
}

export default merge;
