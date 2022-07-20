import copyArray from "./.internal/copyArray";
import getTag from "./.internal/getTag";
import iteratorToArray from "./.internal/iteratorToArray";
import mapToArray from "./.internal/mapToArray";
import setToArray from "./.internal/setToArray";
import stringToArray from "./.internal/stringToArray";
import isArrayLike from "./isArrayLike";
import isString from "./isString";
import type { Values } from "./types";
import values from "./values";

/** `Object#toString` result references.
 * @ignore
 */
const mapTag = "[object Map]";
/**
 * @ignore
 */
const setTag = "[object Set]";

/**
 * Built-in value references.
 * @ignore
 */
const symIterator = Symbol.iterator;

/**
 * Converts `value` to an array.
 *
 * @since 5.6.0
 * @category Lang
 * @param value The value to convert.
 * @returns Returns the converted array.
 * @example
 *
 * ```js
 * toArray({ 'a': 1, 'b': 2 })
 * // => [1, 2]
 *
 * toArray('abc')
 * // => ['a', 'b', 'c']
 *
 * toArray(1)
 * // => []
 *
 * toArray(null)
 * // => []
 * ```
 */
export function toArray(value: number): [];
export function toArray(value: ""): [];
export function toArray(value: null): [];
export function toArray(value: string): Array<string>;
export function toArray<T extends Map<any, any>>(value: T): ReturnType<T["entries"]>;
export function toArray<T extends Set<any>>(value: T): ReturnType<T["values"]>;
export function toArray<T extends object>(value: T): Values<T>;
export function toArray(value: any): any {
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    // TODO: potential error
    return isString(value) ? stringToArray(value) : copyArray(value as unknown as any);
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray(value[symIterator]());
  }
  const tag = getTag(value);
  const func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

  return func(value);
}

export default toArray;
