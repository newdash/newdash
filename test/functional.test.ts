import defineFunctionName from '../src/functional/defineFunctionName';
import { hash } from '../src/functional/hash';
import { hashEqual } from '../src/functional/hashEqual';
import { LRUMap } from '../src/functional/LRUMap';
import { toHashCode } from '../src/functional/toHashCode';


describe('functional', () => {

  it('should support overwrite function name', () => {

    const f1 = () => { };
    const f2 = defineFunctionName(f1, 'f2');

    expect(f1.name).toBe('f2');
    expect(f2.name).toBe('f2');

  });

  it('should support toHashCode', () => {

    const a1 = [1, 2, 3, 4];
    const a2 = [1, 2, 3, 4];

    expect(toHashCode(a1)).toBe(toHashCode(a2));

    const o1 = { a: 1 };
    const o2 = { a: 1 };
    const o3 = { a: 2 };

    expect(toHashCode(o1)).toBe(toHashCode(o2));
    expect(toHashCode(o1)).not.toBe(toHashCode(o3));

    const o4 = { a: 1, b: 2, c: { a: 1, b: 2 } };
    const o5 = { b: 2, c: { b: 2, a: 1 }, a: 1 };
    expect(toHashCode(o4)).toBe(toHashCode(o5));

    const o6 = [{ a: 1, b: 2, c: { a: 1, b: 2 } }];
    const o7 = [{ b: 2, c: { b: 2, a: 1 }, a: 1 }];
    expect(toHashCode(o6)).toBe(toHashCode(o7));

    expect(toHashCode([])).not.toBe(toHashCode(''));
    expect(toHashCode([])).not.toBe(toHashCode([undefined]));
    expect(toHashCode([null, undefined])).not.toBe(toHashCode([undefined, null]));

    expect(toHashCode('simple')).toBe(toHashCode('simple'));
    expect(toHashCode('11')).not.toBe(toHashCode(11));


  });

  it('should support hash', () => {

    expect(hash(123)).toBe(hash(123));
    expect(hash(123, '23')).toBe(hash(123, '23'));
    expect(hash(123, '23')).not.toBe(hash(123, '12'));

  });

  it('should support toHashCode for Map, Set', () => {

    const m1 = new Map();
    const m2 = new Map();
    const m3 = new Map();
    m1.set('v', 'v2');
    m1.set(1, 2);
    m2.set(1, 2);
    m2.set('v', 'v2');
    m3.set('v', 'v2');
    m3.set(1, 3);
    expect(toHashCode(m1)).toBe(toHashCode(m2));
    expect(toHashCode(m1)).not.toBe(toHashCode(m3));

    const s1 = new Set();
    const s2 = new Set();
    const s3 = new Set();

    s1.add(1);
    s1.add('2');
    s1.add({ a: 1 });
    s2.add({ a: 1 });
    s2.add(1);
    s2.add('2');
    s3.add(1);
    s3.add('2');
    s3.add({ a: 2 });

    expect(toHashCode(s1)).toBe(toHashCode(s2));
    expect(toHashCode(s1)).not.toBe(toHashCode(s3));
  });

  it('should support hashEqual', () => {

    const a1 = [1, 2, 3, 4];
    const a2 = [1, 2, 3, 4];

    expect(hashEqual(a1, a2)).toBeTruthy();

  });

  it('should support LRU cache', () => {

    const cache = new LRUMap(3);

    [1, 2, 3, 4, 5].forEach((v) => cache.set(v, `v:${v}`));

    expect(cache.get(2)).toBeUndefined();
    expect(cache.get(3)).toBe('v:3'); // refresh key
    cache.set(6, 'v:6');
    expect(cache.get(4)).toBeUndefined();
    expect(cache.get(3)).toBe('v:3');
    expect(cache.get(6)).toBe('v:6');

  });

});
