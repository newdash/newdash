import assert from "assert";
import { isClass } from "../src/isClass";

describe("isClass", () => {

  it("should support isClass check", () => {

    class A { }
    class B extends A { }
    class C123123$ { }
    class D1231248$ extends C123123$ { }
    class EDate extends Date { }

    const f1 = () => { };
    function f2() { }
    function F3() { this.v = 1; }

    F3.prototype.getV = function () {
      return this.v;
    };

    assert.strictEqual(isClass(A), true);
    assert.strictEqual(isClass(B), true);
    assert.strictEqual(isClass(C123123$), true);
    assert.strictEqual(isClass(D1231248$), true);
    assert.strictEqual(isClass(EDate), true);
    assert.strictEqual(isClass(F3), true);

    assert.strictEqual(isClass(f1), false);
    assert.strictEqual(isClass(f2), false);
    assert.strictEqual(isClass(null), false);
    assert.strictEqual(isClass(undefined), false);
    assert.strictEqual(isClass(Symbol(1)), false);
    assert.strictEqual(isClass(1), false);
    assert.strictEqual(isClass(""), false);
    assert.strictEqual(isClass(true), false);

    assert.strictEqual(isClass({ constructor() { } }), false);


  });


});
