/*
Heavily inspired by SOW Article

ref link: https://stackoverflow.com/a/47941092/4380476
Author: Antonio Narkevich
LICENSE: CC BY-SA 3.0

*/

import { Entry } from './types';

const S_ROOT_OBJECT = 'ROOT';


/**
 * get all circular reference
 * @since 5.18.0
 * @category Object
 * @param object
 * @returns
 */
export function getObjectCycles(object: any): Array<Entry<string>> {

  if (object === undefined || object === null) {
    return [];
  }

  // Save traversed references here
  const traversedProps = new Map();
  const cycles: Array<Entry<string>> = [];

  // Recursive function to go over objects/arrays
  const traverse = function (currentObj: any, currentPath: string = S_ROOT_OBJECT) {
    if (currentObj === null || currentObj === undefined) {
      return;
    }

    // If we saw a node it's a cycle, no need to travers it's entries
    if (traversedProps.has(currentObj)) {
      cycles.push([currentPath, traversedProps.get(currentObj)]);
      return;
    }

    traversedProps.set(currentObj, currentPath);

    // Traversing the entries
    for (const key in currentObj) {

      const value = currentObj[key];

      // We don't want to care about the falsy values
      // Only objects and arrays can produce the cycles and they are truthy
      if (currentObj.hasOwnProperty(key) && value) {

        const valuePath = `${currentPath}['${key}']`;

        if (traversedProps.has(value)) {
          cycles.push([currentPath, valuePath]);
          return;
        }

        if (value.constructor === Object) {
          traverse(value, valuePath);
        }

        if (value.constructor === Array && value.length > 0) {

          for (let i = 0; i < value.length; i += 1) {
            traverse(value[i], `${valuePath}[${i}]`);
          }

        }

        // We don't care of any other values except Arrays and objects.
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
