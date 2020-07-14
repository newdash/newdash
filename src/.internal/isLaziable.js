import getFuncName from "./getFuncName";

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @ignore
 * @param func The function to check.
 * @returns Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
export function isLaziable(func) {
  return false;
}

export default isLaziable
