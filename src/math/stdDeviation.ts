import variance from "./variance";

/**
 * Standard Deviation
 * @since 5.18.0
 * @category Math
 * @param values
 */
export function stdDeviation(values: Float64Array): number {
  return Math.sqrt(variance(values));
}
