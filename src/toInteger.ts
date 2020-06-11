import toFinite from './toFinite';

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @since 5.5.0
 * @category Lang
 * @param value The value to convert.
 * @returns Returns the converted integer.
 * @see [[isInteger]], [[isNumber]], [[toNumber]]
 * @example
 *
 * ```js
 * toInteger(3.2)
 * // => 3
 *
 * toInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toInteger(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toInteger('3.2')
 * // => 3
 * ```
 */
function toInteger(value: any): number {
  const result = toFinite(value),
    remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

export default toInteger;
