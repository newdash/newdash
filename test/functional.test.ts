import defineFunctionName from '../src/functional/defineFunctionName';
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

    expect(toHashCode([])).not.toBe(toHashCode(''));
    expect(toHashCode([])).not.toBe(toHashCode([undefined]));
    expect(toHashCode([null, undefined])).not.toBe(toHashCode([undefined, null]));

    expect(toHashCode('simple')).toBe(toHashCode('simple'));
    expect(toHashCode('11')).not.toBe(toHashCode(11));


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
