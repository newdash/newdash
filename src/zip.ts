import unzip from './unzip';
import baseRest from './.internal/baseRest';

const internalZip = baseRest(unzip);
/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * @since 5.3.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @see unzip, unzipWith, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * ```js
 * zip(['a', 'b'], [1, 2], [true, false])
 * // => [['a', 1, true], ['b', 2, false]]
 * ```
 */
function zip<T1, T2>(a1: Array<T1>, a2: Array<T2>): [T1, T2][]
function zip<T1, T2, T3>(a1: Array<T1>, a2: Array<T2>, a3: Array<T3>): [T1, T2, T3][]
function zip<T1, T2, T3, T4>(a1: Array<T1>, a2: Array<T2>, a3: Array<T3>, a4: Array<T4>): [T1, T2, T3, T4][]
function zip(...arrays: any[][]): any[][] {
  return internalZip(...arrays);
}

export default zip;
