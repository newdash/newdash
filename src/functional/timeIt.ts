import type { AsyncFunction, GeneralFunction } from "../types";
import { createFunctionWrapper } from "./functionWrapper";

/**
 * time the executing time for sync/async function
 *
 * @category Functional
 * @since 5.19.0
 * @param fn execution function
 * @returns the consumed milliseconds of the function execution
 *
 * @example
 *
 * ```js
 * const consumedMSeconds = await timeIt(async () => {
 *  // some async operations
 * })
 * ```
 */
export function timeIt(fn: AsyncFunction<[], void>): Promise<number>
export function timeIt(fn: GeneralFunction<[], void>): number
export function timeIt(fn: any): any {
  return createFunctionWrapper(fn, {
    before: (ctx) => { ctx.state.start = Date.now(); },
    after: (ctx) => (Date.now() - ctx.state.start)
  })();
}

export default timeIt;

