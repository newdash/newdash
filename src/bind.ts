// @ts-nocheck
import baseRest from './.internal/baseRest';
import { WRAP_BIND_FLAG, WRAP_PARTIAL_FLAG } from './.internal/CONSTANTS';
import replaceHolders from './.internal/replaceHolders';
import getHolder from './.internal/getHolder';
import createWrap from './.internal/createWrap';

/**
 * @ignore
 */
const internalBind = baseRest((func, thisArg, partials?) => {
  let holders: any;
  let bitmask = WRAP_BIND_FLAG;
  if (partials.length) {
    holders = replaceHolders(partials, getHolder(bind));
    bitmask |= WRAP_PARTIAL_FLAG;
  }
  return createWrap(func, bitmask, thisArg, partials, holders);
});


/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and `partials` prepended to the arguments it receives.
 *
 * The `bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
 * property of bound functions.
 *
 * @since 5.3.0
 * @category Function
 * @param func The function to bind.
 * @param thisArg The `this` binding of `func`.
 * @param partials The arguments to be partially applied.
 * @returns Returns the new bound function.
 * @example
 *
 * ```js
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // Bound with placeholders.
 * var bound = bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 * ```
 */
export function bind<T>(func: T, thisArg?: any, ...partials: any[]): T {
  return internalBind(func, thisArg, ...partials);
}

/**
 * placeholder of bind function
 */
bind['placeholder'] = '__bind__placeholder__';

export default bind;
