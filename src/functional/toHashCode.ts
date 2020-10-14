import { md5 } from '../md5';

const ARRAY_NOT_OBJECT_TYPES = ['number', 'string', 'bigint', 'symbol', 'function'];
const CONST_S_UNDEFINED = 'undefined';
const CONST_S_NULL = 'null';
const CONST_S_OBJECT = 'object';

function stringSort(a: any, b: any) {
  return String(a).localeCompare(String(b));
}

/**
 * Object.toHashCode
 *
 * remember: the **SAME** structure object will return the **SAME** hash code
 *
 * @category Functional
 * @since 5.15.0
 * @param obj anything in js
 *
 * @returns the hash of the object
 *
 *
 * ```ts
    const a1 = [1, 2, 3, 4];
    const a2 = [1, 2, 3, 4];

    expect(toHashCode(a1)).toBe(toHashCode(a2));

    const o1 = { a: 1 };
    const o2 = { a: 1 };
    const o3 = { a: 2 };

    expect(toHashCode(o1)).toBe(toHashCode(o2));
    expect(toHashCode(o1)).not.toBe(toHashCode(o3));

    expect(toHashCode('simple')).toBe(toHashCode('simple'));
    expect(toHashCode('11')).not.toBe(toHashCode(11));
 * ```
 */
export function toHashCode(obj: any): string {

  const objType = typeof obj;
  if (obj === undefined) {
    return md5(CONST_S_UNDEFINED);
  }
  else if (obj === null) {
    return md5(CONST_S_NULL);
  }
  else if (obj instanceof Array) {
    return md5(`array_${obj.map(toHashCode).join()}`);
  }
  else if (typeof obj === CONST_S_OBJECT) {
    const itemHashes = Object
      .keys(obj)
      .sort(stringSort) // order by keys
      .map((key) => md5(`${key}_${toHashCode(obj[key])}`));
    return md5(`${objType}_${itemHashes.join()}`);
  }
  else if (ARRAY_NOT_OBJECT_TYPES.includes(objType)) {
    return md5(`${objType}_${String(obj)}`);
  }

  throw new TypeError(`invalid object type ${objType}`);

}


export default toHashCode;
