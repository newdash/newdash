import * as assert from "assert";
import lodashStable from "../src";
import isLength from "../src/isLength";
import { MAX_SAFE_INTEGER, stubFalse, stubTrue } from "./utils";

describe("isLength", () => {
  it("should return `true` for lengths", () => {
    const values = [0, 3, MAX_SAFE_INTEGER],
      expected = lodashStable.map(values, stubTrue),
      actual = lodashStable.map(values, isLength);

    assert.deepStrictEqual(actual, expected);
  });

  it("should return `false` for non-lengths", () => {
    const values = [-1, "1", 1.1, MAX_SAFE_INTEGER + 1],
      expected = lodashStable.map(values, stubFalse),
      actual = lodashStable.map(values, isLength);

    assert.deepStrictEqual(actual, expected);
  });
});
