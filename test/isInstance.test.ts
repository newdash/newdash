import { isInstance } from "../src/isInstance";

describe('isInstance Test Suite', () => {


  it('should support instanceof - positive', () => {
    class C { }

    class D extends C { }

    const c = new C
    expect(isInstance(c, C)).toBeTruthy()
    expect(isInstance(new D, C)).toBeTruthy()


  });


  it('should support instanceof - negative', () => {
    class C { }

    for (const v of [0, undefined, Symbol('1'), C, null, '']) {
      expect(isInstance(v, C)).toBeFalsy()
    }

  });

});
