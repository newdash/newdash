import * as assert from "assert";
import extendWith from "../src/extendWith";
import assignInWith from "../src/assignInWith";

describe("assignInWith", () => {
  it("should be aliased", () => {
    assert.strictEqual(extendWith, assignInWith);
  });
});
