// @ts-nocheck
import { GeneralFunction } from "../types";


/**
 * create try functions wrapper
 *
 * the wrapper will try runners one by one, return the successful value, or the last error
 *
 * @since 5.18.0
 * @category Fallback
 * @param runners runners functions
 */
export function toTry<R>(...runners: Array<GeneralFunction<any[], R>>): (...args: any[]) => R {

  return function (...args: any[]) {

    try {
      const rt = runners[0](...args);
      if (rt instanceof Promise) {
        return new Promise((resolve, reject) => {
          rt.then(resolve)
            .catch((error) => {
              if (runners.length === 1) {
                reject(error);
              } else {
                resolve(toTry(...runners.splice(1))(...args));
              }
            });
        });
      }
      return rt;
    } catch (error) {
      if (runners.length === 1) {
        throw error;
      } else {
        return toTry(...runners.splice(1))(...args);
      }
    }

  };

}

export default toTry;
