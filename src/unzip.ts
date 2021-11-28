import baseProperty from "./.internal/baseProperty";
import isArrayLikeObject from "./isArrayLikeObject";
import arrayFilter from "./.internal/arrayFilter";
import baseTimes from "./.internal/baseTimes";
import arrayMap from "./.internal/arrayMap";

/**
 * This method is like `zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @since 5.3.0
 * @category Array
 * @param array The array of grouped elements to process.
 * @returns Returns the new array of regrouped elements.
 * @see unzipWith,zip,zipObject,zipObjectDeep,zipWith
 * @example
 *
 * ```js
 * const zipped = zip(['a', 'b'], [1, 2], [true, false])
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * unzip(zipped)
 * // => [['a', 'b'], [1, 2], [true, false]]
 * ```
 */
function unzip(array: any[][]): any[][] {
  if (!(array && array.length)) {
    return [];
  }
  let length = 0;
  array = arrayFilter(array, (group) => {
    if (isArrayLikeObject(group)) {
      length = Math.max(group.length, length);
      return true;
    }
  });
  return baseTimes(length, (index) => arrayMap(array, baseProperty(index)));
}

export default unzip;
