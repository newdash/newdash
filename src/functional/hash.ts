import toHashCode from './toHashCode';

/**
 * get hash value from params
 *
 * @category Functional
 * @since 5.18.0
 * @param args
 * @returns the hash of the object (string(32))
 */
export function hash(...args: any[]): string {
  return toHashCode(args);
}
