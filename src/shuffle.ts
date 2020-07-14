import copyArray from './.internal/copyArray';
import { shuffleSelf } from './.internal/shuffleSelf';
import isArray from './isArray';
import values from './values';
import { Collection } from './types';


/**
 * @private
 * @ignore
 * @param array
 */
function arrayShuffle(array) {
  return shuffleSelf(copyArray(array));
}

/**
 * @ignore
 * @private
 * @param collection
 */
function baseShuffle(collection) {
  return shuffleSelf(values(collection));
}

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @since 5.11.0
 * @category Array
 * @param collection The array to shuffle.
 * @returns Returns the new shuffled array.
 * @example
 *
 * ```js
 * shuffle([1, 2, 3, 4])
 * // => [4, 1, 3, 2]
 * ```
 */
export function shuffle<T>(collection: Collection<T>): Array<T> {
  const func = isArray(collection) ? arrayShuffle : baseShuffle;
  return func(collection);
}

export default shuffle;
