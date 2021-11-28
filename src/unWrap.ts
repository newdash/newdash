import trimPrefix from "./trimPrefix";
import trimSuffix from "./trimSuffix";

/**
 *
 * unWrap a string
 *
 * @since 5.14.0
 *
 * @param inner
 * @param wrapper the wrapped str will be added to inner
 *
 *
 * ```js
 * unWrap("'value'", "'") => "value"
 * unWrap("value", "'") => "value"
 * ```
 */
export function unWrap(inner: string, wrapper: string): string {
  return trimSuffix(trimPrefix(inner, wrapper), wrapper);
}

export default unWrap;
