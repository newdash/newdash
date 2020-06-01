
/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

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
const isBuffer = nativeIsBuffer || (() => false);

export default isBuffer;
