import { isCircular } from '../src/isCircular';

describe('isCircular', () => {

  it('should support simple check falsy', () => {

    expect(isCircular(undefined)).toBeFalsy();
    expect(isCircular(null)).toBeFalsy();
    expect(isCircular([])).toBeFalsy();
    expect(isCircular({})).toBeFalsy();
    expect(isCircular(Symbol(''))).toBeFalsy();
    expect(isCircular(1)).toBeFalsy();
    expect(isCircular(NaN)).toBeFalsy();

  });


  it('should support simple check truth', () => {

    const a: any = {};
    a.a = a;
    expect(isCircular(a)).toBeTruthy();

    const b = new Array(3);
    b[2] = b;
    expect(isCircular(b)).toBeTruthy();

    const c = new Array(3);
    c['c'] = c;
    expect(isCircular(c)).toBeTruthy();


  });


});
