/*

Heavily inspired by SOW Article

ref link: https://stackoverflow.com/a/47941092/4380476
Author: Antonio Narkevich
LICENSE: CC BY-SA 3.0

*/

import { Entry } from "./types";

const S_ROOT_OBJECT = "ROOT";


/**
 * get all circular reference
 *
 * @since 5.18.0
 * @category Object
 * @param object
 * @returns
 */
export function getObjectCycles(object: any): Array<Entry<string>> {

  if (object === undefined || object === null) {
    return [];
  }

  /**
   * key: object
   * value: path
   */
  const traversedProps = new Map<any, string>();
  const cycles: Array<Entry<string>> = [];

  const traverse = function (currentObj: any, currentPath: string = S_ROOT_OBJECT) {

    if (currentObj === null || currentObj === undefined) {
      return;
    }

    if (traversedProps.has(currentObj)) {
      cycles.push([currentPath, traversedProps.get(currentObj)]);
      return;
    }

    traversedProps.set(currentObj, currentPath);

    for (const key in currentObj) {
      const value = currentObj[key];
      const valuePath = `${currentPath}['${key}']`;
      if (Object?.prototype?.hasOwnProperty?.call(currentObj, key) && value) {
        traverse(value, valuePath);
      }
    }

  };

  traverse(object);

  traversedProps.clear();

  return cycles;
};


/**
 * given an object, check wether the object has circular reference or not
 *
 * @since 5.18.0
 * @category Object
 * @returns truth if the given object has circular reference
 */
export function isCircular(obj: any): boolean {

  const cycle = getObjectCycles(obj);

  if (cycle.length > 0) {
    return true;
  }

  return false;

}


export default isCircular;
