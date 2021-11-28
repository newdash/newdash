import * as assert from "assert";
import entries from "../src/entries";
import toPairs from "../src/toPairs";

describe("toPairs", () => {
  it("should be aliased", () => {
    assert.strictEqual(entries, toPairs);
  });
});
