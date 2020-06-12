
/**
 * async sleep, release CPU and go to next action after milliseconds
 *
 * @category Async
 * @param ms millisecond
 * @example
 *
 * ```js
 *
 * async function() {
 *    await sleep(1000)
 *    // after 1 seconds
 *    // do something other
 * }
 *
 * ```
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default sleep;
