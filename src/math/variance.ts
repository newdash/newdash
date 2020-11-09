import mean from './mean';
import sum from './sum';

/**
 * Variance
 *
 * @since 5.18.0
 * @category Math
 * @param values
 */
export function variance(values: Float64Array): number {
  const mValue = mean(values);
  return sum(values.map((value) => (value - mValue) ** 2)) / values.length;
}

export default variance;
