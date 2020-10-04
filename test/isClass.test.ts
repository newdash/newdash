import assert from 'assert';
import { isClass } from '../src/isClass';

describe('isClass Test Suite', () => {

  it('should support isClass check', () => {

    class A { }
    class B extends A { }
    class C123123$ { }
    class D1231248$ extends C123123$ { }

    const f1 = () => { };
    function f2() { }

    assert.strictEqual(isClass(A), true);
    assert.strictEqual(isClass(B), true);
    assert.strictEqual(isClass(C123123$), true);
    assert.strictEqual(isClass(D1231248$), true);

    assert.strictEqual(isClass(f1), false);
    assert.strictEqual(isClass(f2), false);

  });


});
