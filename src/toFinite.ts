import toNumber from './toNumber';

/**
 * Used as references for various `Number` constants.
 * @ignore
 *
 */
const INFINITY = Infinity;
/**
 * @ignore
 */
const MAX_INTEGER = Number.MAX_VALUE || 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to convert.
 * @returns Returns the converted number.
 * @example
 *
 * ```js
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
 * ```
 */
function toFinite(value: any): number {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    const sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

export default toFinite;
