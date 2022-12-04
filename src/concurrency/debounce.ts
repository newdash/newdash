import { mustProvide } from "../assert";
import { debounce as nativeDebounce } from "../debounce";
import { defineFunctionName } from "../functional/defineFunctionName";
import { AsyncFunction } from "../types";


/**
 * concurrency simply debounce function
 *
 * it will create a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked
 *
 * @since 5.18.0
 * @category Async
 *
 * @param runner
 * @param wait wait milliseconds before last time invocation
 */
export function debounce<T extends AsyncFunction>(runner: T, wait: number): T {
  mustProvide(runner, "runner", "function");
  mustProvide(wait, "wait", "number");
  return defineFunctionName(nativeDebounce(runner, wait), runner?.name) as any as T;
}


export default debounce;
