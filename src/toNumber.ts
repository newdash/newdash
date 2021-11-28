import isObject from "./isObject";
import isSymbol from "./isSymbol";


/**
 * Used to match leading and trailing whitespace.
 * @ignore
 */
const reTrim = /(^\s+)|(\s+$)/g;

/**
 * Used to detect bad signed hexadecimal string values.
 * @ignore
 */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/**
 * Used to detect binary string values.
 *
 * @ignore
 */
const reIsBinary = /^0b[01]+$/i;

/**
 * Used to detect octal string values.
 * @ignore
 */
const reIsOctal = /^0o[0-7]+$/i;

/**
 * Built-in method references without a dependency on `root`.
 * @ignore
  */
const freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @since 5.0.0
 * @category Lang
 * @param value The value to process.
 * @returns Returns the number.
 * @see [[isInteger]],[[toInteger]],[[isNumber]]
 * @example
 *
 * ```js
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 * ```
 */
export function toNumber(value: any): number {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return Number.NaN;
  }
  if (isObject(value)) {
    const other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? (`${other}`) : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, "");
  const isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? Number.NaN : +value);
}

export default toNumber;
