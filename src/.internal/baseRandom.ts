

/**
 * create random value
 *
 * @param lower
 * @param upper
 */
export function baseRandom(lower: number, upper: number): number {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}
