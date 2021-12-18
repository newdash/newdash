import baseRest from "./.internal/baseRest";
import createWrap from "./.internal/createWrap";
import getHolder from "./.internal/getHolder";
import replaceHolders from "./.internal/replaceHolders";

/**
 * @ignore
 */
const WRAP_PARTIAL_FLAG = 32;

/**
 * @ignore
 */
const internalPartial = baseRest((func, partials) => {
  const holders = replaceHolders(partials, getHolder(partial));
  return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
});

/**
 * Creates a function that invokes `func` with `partials` prepended to the
 * arguments it receives. This method is like `bind` except it does **not**
 * alter the `this` binding.
 *
 * The `partial.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for partially applied arguments.
 *
 * **Note:** This method doesn't set the "length" property of partially
 * applied functions.
 *
 * @since 5.5.0
 * @category Function
 * @param func The function to partially apply arguments to.
 * @param partials The arguments to be partially applied.
 * @returns  Returns the new partially applied function.
 * @example
 *
 * ```js
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * var sayHelloTo = partial(greet, 'hello');
 * sayHelloTo('fred');
 * // => 'hello fred'
 *
 * // Partially applied with placeholders.
 * var greetFred = partial(greet, partial.placeholder, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 * ```
 */
export function partial<F extends (...args: any[]) => any>(
  func: F, ...partials: any[]): (...args: any[]
) => ReturnType<F>;
export function partial(...args: any[]): any {
  return internalPartial(...args);
}

/**
 * placeholder of partial function
 */
partial.placeholder = "__partial__placeholder__";

export default partial;
