import { mustProvide, mustProvideN } from "../assert";
import { createFunctionWrapper } from "../functional/functionWrapper";
import LRUMap from "../functional/LRUMap";
import toHashCode from "../functional/toHashCode";
import { AsyncFunction } from "../types";


/**
 * reuse values in specific duration for async functions
 *
 * @category Async
 * @since 5.22.0
 * @param runner must be an async function
 * @param duration default 1000 milliseconds
 * @param maxHandles different cache values for parameters
 * @returns
 */
export function reuse<T extends AsyncFunction>(runner: T, duration: number = 1000, maxHandles = 1000) {

  mustProvideN(runner, "runner", "async_function");
  mustProvide(duration, "duration", "number");
  mustProvide(maxHandles, "maxHandles", "number");

  return createFunctionWrapper(runner, {
    global: {
      duration,
      handles: new LRUMap<string, { value: any, timeout: number }>(maxHandles),
    },
    execute(ctx) {
      const { args, global: { handles } } = ctx;
      const key = toHashCode(args);
      if (handles.has(key)) {
        const { value, timeout } = ctx.global.handles.get(key);
        if (timeout >= Date.now()) { return value; }
      }
      const v = ctx.runner(...ctx.args);
      handles.set(key, { value: v, timeout: Date.now() + duration });
      return v;
    },
  });

}

export default reuse;
