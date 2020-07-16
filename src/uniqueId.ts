/**
 * Used to generate unique IDs.
 * @ignore
 */
const idCounter = {};

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @since 5.12.0
 * @category Util
 * @param prefix The value to prefix the ID with.
 * @returns Returns the unique ID.
 * @see [[random]]
 * @example
 *
 * ```js
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 * ```
 */
export function uniqueId(prefix = '$lodash$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === '$lodash$') {
    return `${id}`;
  }

  return `${prefix}${id}`;
}

export default uniqueId;
