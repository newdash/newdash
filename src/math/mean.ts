import { sum } from "./sum";

/**
 *
 * Mean (avg) values
 * @since 5.18.0
 * @category Math
 * @param values
 *
 */
export function mean(values: Float64Array) {
  return sum(values) / values.length;
}

export default mean;
