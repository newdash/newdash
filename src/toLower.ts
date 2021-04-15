import { toString } from './toString';

/**
 *
 * toLower case
 *
 * @since 5.19.0
 * @category String
 * @param value The string to convert.
 * @returns Returns the lower cased string.
 */
export function toLower(value: string): string {
  return toString(value).toLowerCase();
}

export default toLower;
