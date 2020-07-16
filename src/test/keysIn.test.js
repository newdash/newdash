import assert from "assert";
import { keysIn } from "../keysIn";


describe('keysIn', () => {

  it('should match the examples', () => {

    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;

    assert.deepStrictEqual(keysIn(new Foo), ['a', 'b', 'c']);

    assert.deepStrictEqual(keysIn(['a', 'b', 'c']), ['0', '1', '2']);


  });

});
