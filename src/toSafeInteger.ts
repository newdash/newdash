import toInteger from "./toInteger";

/**
 * @ignore
 * @private
 * @internal
 */
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

/**
 * Converts `value` to a safe integer. A safe integer can be compared and
 * represented correctly.
 *
 * @since 5.7.0
 * @category Lang
 * @param value The value to convert.
 * @returns Returns the converted integer.
 * @example
 *
 * ```js
 * toSafeInteger(3.2)
 * // => 3
 *
 * toSafeInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toSafeInteger(Infinity)
 * // => 9007199254740991
 *
 * toSafeInteger('3.2')
 * // => 3
 * ```
 */
export function toSafeInteger(value: string): number;
export function toSafeInteger(value: number): number;
export function toSafeInteger(value: any): number {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toInteger(value);
  if (value < -MAX_SAFE_INTEGER) {
    return -MAX_SAFE_INTEGER;
  }
  if (value > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER;
  }
  return value;
}

export default toSafeInteger;
