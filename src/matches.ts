import baseClone from "./.internal/baseClone";
import baseMatches from "./.internal/baseMatches";

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that performs a partial deep comparison between a given
 * object and `source`, returning `true` if the given object has equivalent
 * property values, else `false`.
 *
 * **Note:** The created function is equivalent to `isMatch` with `source`
 * partially applied.
 *
 * Partial comparisons will match empty array and empty object `source`
 * values against any array or object value, respectively. See `isEqual`
 * for a list of supported value comparisons.
 *
 * @since 5.11.0
 * @category Util
 * @param source The object of property values to match.
 * @returns Returns the new spec function.
 * @example
 *
 * const objects = [
 *   { 'a': 1, 'b': 2, 'c': 3 },
 *   { 'a': 4, 'b': 5, 'c': 6 }
 * ]
 *
 * filter(objects, matches({ 'a': 4, 'c': 6 }))
 * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
 */
export function matches<T>(source: Array<T>): (obj: T) => boolean {
  // @ts-ignore
  return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
}

export default matches;
