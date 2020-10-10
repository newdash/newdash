import isFunction from './isFunction';

type BoolFunction = (...args: any[]) => boolean
type AsyncBoolFunction = (...args: any[]) => Promise<boolean>

/**
 * (sync) allTrue
 *
 * @since 5.15.0
 * @param expressions
 * @returns all expressions return true
 */
export function allTrue(...expressions: (boolean | BoolFunction)[]): boolean {
  for (const expression of expressions) {
    let b: any;
    if (isFunction(expression)) {
      b = expression();
    } else {
      b = expression;
    }
    if (b === false) {
      return false;
    }
  }
  return true;
}

/**
 *
 * (async) allTrue
 * @since 5.15.0
 * @param expressions
 * @returns all expressions return true
 */
export async function asyncAllTrue(...expressions: (boolean | BoolFunction | AsyncBoolFunction)[]): Promise<boolean> {
  for (const expression of expressions) {
    let b: any;
    if (isFunction(expression)) {
      b = expression();
      if (b instanceof Promise) {
        b = await b;
      }
    } else {
      b = expression;
    }
    if (b === false) {
      return false;
    }
  }


  return true;
}
/**
 * (sync) anyTrue
 *
 * @since 5.15.0
 * @param expressions
 */
export function anyTrue(...expressions: (boolean | BoolFunction)[]): boolean {

  for (const expression of expressions) {
    let b: any;
    if (isFunction(expression)) {
      b = expression();
    } else {
      b = expression;
    }
    if (b) {
      return true;
    }
  }


  return false;
}

/**
 * (async) anyTrue
 *
 * @since 5.15.0
 * @param expressions
 */
export async function asyncAnyTrue(...expressions: (boolean | BoolFunction | AsyncBoolFunction)[]): Promise<boolean> {

  for (const expression of expressions) {
    let b: any;
    if (isFunction(expression)) {
      b = expression();
      if (b instanceof Promise) {
        b = await b;
      }
    } else {
      b = expression;
    }
    if (b) {
      return true;
    }
  }


  return false;
}


export const logic = {
  asyncAllTrue,
  asyncAnyTrue,
  allTrue,
  anyTrue
};
