import { any } from "../any";
import { timeout } from "../timeout";
import { allSettled } from "./allSettled";
import { filter } from "./filter";
import { LazyPromise } from "./LazyPromise";
import { map } from "./map";

/**
 * AsyncUtils
 *
 * @since 5.18.0
 */
export const AsyncUtils = {
  filter, map, allSettled, any, timeout, LazyPromise
};

export default AsyncUtils;
