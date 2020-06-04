import createWrap from './.internal/createWrap';
import { WRAP_REARG_FLAG } from './.internal/CONSTANTS';
import flatRest from './.internal/flatRest';

/**
 * @ignore
 * @private
 */
const internalRearg = flatRest(
  (func: any, indexes: any): any => createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes)
);

/**
 * Creates a function that invokes `func` with arguments arranged according
 * to the specified `indexes` where the argument value at the first index is
 * provided as the first argument, the argument value at the second index is
 * provided as the second argument, and so on.
 *
 * @since 5.5.0
 * @category Function
 * @param func The function to rearrange arguments for.
 * @param indexes The arranged argument indexes.
 * @returns Returns the new function.
 * @example
 *
 * ```js
 * var rearged = rearg(function(a, b, c) {
 *   return [a, b, c];
 * }, [2, 0, 1]);
 *
 * rearged('b', 'c', 'a')
 * // => ['a', 'b', 'c']
 * ```
 */
function rearg(func: Function, indexes: number[]);
function rearg(func: Function, ...indexes: number[]);
function rearg(...args) {
  return internalRearg(...args);
};

export default rearg;
