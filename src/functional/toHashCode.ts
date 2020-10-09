import { md5 } from '../md5';

/**
 * Object.toHashCode
 *
 * remember: the **SAME** structure object will return the **SAME** hash code
 *
 * @category functional
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
  if (obj === undefined) { return md5('undefined'); }
  else if (obj === null) { return md5('null'); }
  else if (obj instanceof Array) { return md5(obj.map(toHashCode).join()); }
  else if (typeof obj === 'object') {
    return md5(`object_${JSON.stringify(obj)}`);
  }
  else if (['number', 'string', 'bigint', 'symbol', 'function'].includes(objType)) {
    return md5(`${objType}_${String(obj)}`);
  }

  throw new TypeError(`invalid object type ${typeof obj}`);

}
