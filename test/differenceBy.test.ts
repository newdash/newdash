import * as assert from "assert";
import differenceBy from "../src/differenceBy";
import { slice } from "./utils";

describe("differenceBy", () => {
  it("should accept an `iteratee`", () => {
    const actual1 = differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    assert.deepStrictEqual(actual1, [1.2]);

    const actual2 = differenceBy([{ "x": 2 }, { "x": 1 }], [{ "x": 1 }], "x");
    assert.deepStrictEqual(actual2, [{ "x": 2 }]);
  });

  it("should provide correct `iteratee` arguments", () => {
    let args;

    differenceBy([2.1, 1.2], [2.3, 3.4], function () {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [2.3]);
  });

});
