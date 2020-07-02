import assert from "assert"
import { fromEntries } from "../fromEntries";

describe('fromEntries', () => {

  it('should merge entires to object', () => {

    const obj = { "v1": 1, "v2": 2 }
    assert.deepStrictEqual(fromEntries(Object.entries(obj)), obj)

  });

});
