import * as assert from "assert";
import { toSafeInteger } from "../src/toSafeInteger";


describe("toSafeInteger", () => {

  it("should support to save integer", () => {

    assert.strictEqual(toSafeInteger(3.2), 3);
    assert.strictEqual(toSafeInteger(Number.MIN_VALUE), 0);
    assert.strictEqual(toSafeInteger(Infinity), 9007199254740991);
    assert.strictEqual(toSafeInteger("3.2"), 3);

  });


});
