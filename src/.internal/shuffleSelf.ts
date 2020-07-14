import { baseRandom } from "./baseRandom";

/**
 * @ignore
 * @private
 * @param array
 * @param size
 */
export function shuffleSelf(array: Array<any>, size?) {
  let index = -1;
  const length = array.length;
  const lastIndex = length - 1;

  size = size === undefined ? length : size;
  while (++index < size) {
    const rand = baseRandom(index, lastIndex),
      value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}


export default shuffleSelf
