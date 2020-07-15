import assert from "assert";
import { someValues } from "../someValue";



describe('someValue', () => {

  it('should impl example description', () => {

    const obj = { 'a': 0, 'b': 'yes', 'c': false }
    assert.strictEqual(someValues(obj, Boolean), true)

    const obj2 = { 'a': 0, 'b': 0, 'c': false }

    assert.strictEqual(someValues(obj2, Boolean), false)

  });

});
