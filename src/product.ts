import isArray from './isArray';
import isNumber from './isNumber';
import map from './map';

/**
 * Create product from given values
 *
 * @param v1
 * @param v2
 *
 * @example
 *
 * ```js
 * product(3, 2) // => 6
 * product([1, 2], 2) // => [2, 4]
 * product([1, 2], [2, 3]) // [[1, 2], [1, 3], [2, 2], [2, 3]]
 * product([1, 2], ['2', '3']) // [[1, '2'], [1, '3'], [2, '2'], [2, '3']]
 * ```
 */


export function product<T1, T2>(v1: Array<T1>, v2: Array<T2>): Array<[T1, T2]>;
export function product(v1: Array<number>, v2: number): Array<number>;
export function product(v1: number, v2: Array<number>): Array<number>;
export function product(v1: number, v2: number): number;
export function product(v1: any, v2: any): number;
export function product(v1: any, v2: any): any {

  if (isArray(v1) && isArray(v2)) {

    const rt = [];
    v1.forEach((v1i) => {
      v2.forEach((v2i) => rt.push([v1i, v2i]));
    });
    return rt;

  } else if (isArray(v1) || isArray(v2)) {
    const arr = isArray(v1) ? v1 : v2;
    const value = isArray(v1) ? v2 : v1;
    return map(arr, (v) => v * value);
  } else if (isNumber(v1) && isNumber(v2)) {
    return v1 * v2;
  }

  return NaN; // not supported

}

export default product;
