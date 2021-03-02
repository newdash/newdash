import assignValue from './.internal/assignValue';
import baseZipObject from './.internal/baseZipObject';

/**
 * This method is like `fromPairs` except that it accepts two arrays,
 * one of property identifiers and one of corresponding values.
 *
 * @since 5.3.0
 * @category Array
 * @param props The property identifiers.
 * @param values The property values.
 * @returns Returns the new object.
 * @see [[unzip]],[[unzipWith]],[[zip]],[[zipObjectDeep]],[[zipWith]]
 * @example
 *
 * ```js
 * zipObject(['a', 'b'], [1, 2])
 * // => { 'a': 1, 'b': 2 }
 * ```
 */
export function zipObject(props: Array<string>, values: Array<any>): any {
  return baseZipObject(props || [], values || [], assignValue);
}

export default zipObject;
