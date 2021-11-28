import * as assert from "assert";
import { multiply } from "../src/multiply";


describe("product tests", () => {

  it("should create product for number", () => {
    assert.strictEqual(multiply(3, 4), 12);
    assert.strictEqual(multiply("3", "4"), 12);

    assert.ok(isNaN(multiply("b", "a")));
  });

  it("should create product for number & array", () => {
    assert.deepStrictEqual(multiply([1, 2, 3], 4), [4, 8, 12]);
    assert.deepStrictEqual(multiply(4, [1, 2, 3]), [4, 8, 12]);
    assert.deepStrictEqual(multiply("4", [1, 2, 3]), [4, 8, 12]);

    multiply("a", [1, 2, 3]).forEach((item) => assert.ok(isNaN(item)));
  });

  it("should create product for array & array", () => {
    assert.deepStrictEqual(multiply([1, 2], [3, 4]), [[1, 3], [1, 4], [2, 3], [2, 4]]);
    assert.deepStrictEqual(multiply([1, 2], ["3", "4"]), [[1, "3"], [1, "4"], [2, "3"], [2, "4"]]);
  });

});
