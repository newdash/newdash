

/**
 * Math sum
 * @category Math
 * @since 5.18.0
 * @param values
 */
export function sum(values: Float64Array): number {
  return values.reduce((pre, value) => pre + value, 0);
}

export default sum;
