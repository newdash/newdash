import { identity } from './.internal/identity';
import { isEmpty } from './isEmpty';
import { toString } from './toString';

type Indexer<T = any> = (v: T) => number

/**
 * hash sort function
 *
 * @since 5.21.0
 * @param collection array collection
 * @param indexer extract numeric index from each item of collection
 * @param reverse reverse the sort order (DESC)
 * @returns the sorted list
 *
 * @example
 *
 * ```js
 * hashSort([2, 999, 3, 113, 3, 32, 3, 4])
 * // [2, 3, 3, 3, 4, 32, 113, 999]
 *
 * hashSort(
    [
      { age: 2 },{ age: 999 },{ age: 3 },
      { age: 113 },{ age: 3 },{ age: 32 },
      { age: 3 },{ age: 4 }
    ],
    (item) => item.age
  )
  // [
  //   { age: 2 },{ age: 3 },{ age: 3 },
  //   { age: 3 },{ age: 4 },{ age: 32 },
  //   { age: 113 },{ age: 999 }
  // ]
 * ```
 */
export function hashSort<T>(
  collection: Array<T>,
  indexer?: Indexer<T>,
  reverse: boolean = false
): Array<T> {
  const hashTable: Array<Array<T>> = [];
  if (indexer === undefined) {
    // @ts-ignore
    indexer = identity;
  }

  for (const item of collection) {
    const index = indexer(item);
    if (typeof index !== 'number') {
      throw new TypeError(`for the value ${toString(item)}, the indexer function return the ${typeof indexer} value, expected: number`);
    }
    if (index < 0) {
      throw new Error(`for the value ${toString(item)}, the indexer function return the value ${index}, expected number greater or equal then 0`);
    }
    if (hashTable[index] === undefined) {
      hashTable[index] = [];
    }
    hashTable[index].push(item);
  }

  let tmpArr = hashTable.filter((list) => !isEmpty(list));
  if (reverse) {
    tmpArr = tmpArr.reverse();
  }
  return tmpArr.reduce(
    (pre, cur) => { pre.push(...cur); return pre; },
    []
  );
}

export default hashSort;
