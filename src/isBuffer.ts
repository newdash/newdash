// @ts-nocheck

/**
 * Checks if `value` is a buffer.
 *
 * @since 5.4.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * ```js
 * isBuffer(new Buffer(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 * ```
 */
export function isBuffer(value: any): value is Buffer {
  if (typeof Buffer == 'object') {
    const nativeIsBuffer = Buffer?.isBuffer;
    if (nativeIsBuffer) {
      return nativeIsBuffer(value);
    }
  }
  const className = value?.constructor?.name;
  return className == 'Buffer';
}

export default isBuffer;
