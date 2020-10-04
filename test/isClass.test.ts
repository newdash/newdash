import { isClass } from '../src/isClass';

describe('isClass Test Suite', () => {

  it('should support isClass check', () => {

    class A { }
    class B extends A { }
    class C123123$ { }
    class D1231248$ extends C123123$ { }

    const f1 = () => { };
    function f2() { }

    expect(isClass(A)).toBeTruthy();
    expect(isClass(B)).toBeTruthy();
    expect(isClass(C123123$)).toBeTruthy();
    expect(isClass(D1231248$)).toBeTruthy();

    expect(isClass(f1)).toBeFalsy();
    expect(isClass(f2)).toBeFalsy();

  });


});
