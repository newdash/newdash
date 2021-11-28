import * as assert from "assert";
import xorWith from "../src/xorWith";
import isEqual from "../src/isEqual";

describe("xorWith", () => {

  it("should work with a `comparator`", () => {
    const objects = [{ "x": 1, "y": 2 }, { "x": 2, "y": 1 }],
      others = [{ "x": 1, "y": 1 }, { "x": 1, "y": 2 }],
      actual = xorWith(isEqual, objects, others);

    assert.deepStrictEqual(actual, [objects[1], others[0]]);
  });

});
