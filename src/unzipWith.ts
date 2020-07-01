// @ts-nocheck
import unzip from './unzip';
import arrayMap from './.internal/arrayMap';

/**
 * This method is like `unzip` except that it accepts `iteratee` to specify
 * how regrouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @since 5.7.0
 * @category Array
 * @param array The array of grouped elements to process.
 * @param iteratee The function to combine
 *  regrouped values.
 * @returns Returns the new array of regrouped elements.
 * @example
 *
 * ```js
 * const zipped = zip([1, 2], [10, 20], [100, 200])
 * // => [[1, 10, 100], [2, 20, 200]]
 *
 * unzipWith(zipped, add)
 * // => [3, 30, 300]
 * ```
 */
export function unzipWith<T>(array: Array<Array<T>>, iteratee?: Function): Array<T> {
  if (!(array != null && array.length)) {
    return [];
  }
  const result = unzip(array);
  if (iteratee == null) {
    return result;
  }
  return arrayMap(result, (group: any) => iteratee(...group));
}

export default unzipWith;
