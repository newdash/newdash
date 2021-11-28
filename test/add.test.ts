import * as assert from "assert";
import add from "../src/add";

describe("add", () => {

  it("should add two numbers", () => {
    assert.strictEqual(add(6, 4), 10);
    assert.strictEqual(add(-6, 4), -2);
    assert.strictEqual(add(-6, -4), -10);
  });

  it("should not coerce arguments to numbers", () => {

    expect(add("6", "4")).toBe("64");
    expect(add("x", "y")).toBe("xy");
  });

});
