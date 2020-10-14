

/**
 * overwrite the name of function
 *
 * @since 5.15.0
 * @category Functional
 * @param func
 * @param name
 */
export function defineFunctionName<T>(func: T, name: string): T {
  if (func !== undefined && name !== undefined) {
    Object.defineProperty(func, 'name', { value: name });
  }
  return func;
}


export default defineFunctionName;
