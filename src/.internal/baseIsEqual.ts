import baseIsEqualDeep from './baseIsEqualDeep'
import isObjectLike from '../isObjectLike'

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param value The value to compare.
 * @param other The other value to compare.
 * @param bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param [customizer] The function to customize comparisons.
 * @param [stack] Tracks traversed `value` and `other` objects.
 * @returns Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value: any, other: any, bitmask?: any, customizer?: any, stack?: any): boolean {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

export default baseIsEqual
