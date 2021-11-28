import { isSubClass } from "../src/isSubClass";

describe("isSubClass", () => {


  it('should "isSubClass" function', () => {
    class A extends Map { }
    class B { }
    class C extends A { }
    class D extends C { }
    expect(isSubClass(B, A)).toBeFalsy();
    expect(isSubClass(A, B)).toBeFalsy();
    expect(isSubClass(A, A)).toBeFalsy();

    expect(isSubClass(C, A)).toBeTruthy();
    expect(isSubClass(D, A)).toBeTruthy();
    expect(isSubClass(C, Map)).toBeTruthy();
    expect(isSubClass(D, Map)).toBeTruthy();
  });


});
