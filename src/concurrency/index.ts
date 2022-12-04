import { any } from "../any";
import { series } from "../series";
import { debounce } from "./debounce";
import { limit, synchronized } from "./limit";
import { reuse } from "./reuse";
import { timeout } from "./timeout";


/**
 * concurrency functions
 */
export const concurrency = {
  limit,
  timeout,
  any,
  series,
  debounce,
  synchronized,
  reuse,
};
