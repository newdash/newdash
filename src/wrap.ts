import addPrefix from './addPrefix';
import addSuffix from './addSuffix';

/**
 *
 * wrap a string
 *
 * @since 5.14.0
 *
 * @param inner
 * @param wrapper the wrapped str will be added to inner
 */
export function wrap(inner: string, wrapper: string): string {
  return addSuffix(addPrefix(inner, wrapper), wrapper);
}

export default wrap;
