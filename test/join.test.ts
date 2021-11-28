import * as assert from "assert";
import join from "../src/join";

describe("join", () => {

  const array = ["a", "b", "c"];

  it("should return join all array elements into a string", () => {

    assert.strictEqual(join(array, "~"), "a~b~c");
    assert.strictEqual(join(array), "a,b,c");
    assert.strictEqual(join(array, ""), "abc");
    assert.strictEqual(join([], ""), "");

  });

});
