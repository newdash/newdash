
interface Predicate<K = any, V = any, O = any> {
  (value?: V, key?: K, object?: O): boolean
}

/**
 * Iterates over properties of `object`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, key, object).
 *
 * If you want an object in return, consider `pickBy`.
 *
 * @since 5.3.0
 * @category Object
 * @param object The object to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns the new filtered array.
 * @see [[pickBy]],[[pull]],[[pullAll]],[[pullAllBy]],[[pullAllWith]],[[pullAt]],[[remove]],[[reject]]
 * @example
 *
 * ```js
 * const object = { 'a': 5, 'b': 8, 'c': 10 }
 *
 * filterObject(object, (n) => !(n % 5))
 * // => [5, 10]
 * ```
 */
function filterObject<T>(object: Record<string, T>, predicate?: Predicate<string, T, Record<string, T>>): T[];
function filterObject<T>(object: Array<T>, predicate?: Predicate<string, T, Array<T>>): T[];
function filterObject(object: any, predicate?: Predicate): any[];
function filterObject(object: any, predicate?: any) {
  object = Object(object);
  const result = [];

  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (predicate(value, key, object)) {
      result.push(value);
    }
  });

  return result;
}


export { filterObject };

export default filterObject;
