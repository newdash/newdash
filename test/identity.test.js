import * as assert from "assert";
import identity from "../src/.internal/identity";

describe("identity", () => {
  it("should return the first argument given", () => {
    const object = { "name": "fred" };
    assert.strictEqual(identity(object), object);
  });
});
