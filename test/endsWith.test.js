import * as assert from "assert";
import { MAX_SAFE_INTEGER, falsey, stubTrue } from "./utils";
import endsWith from "../src/endsWith";
import each from "../src/each";
import { map } from "../src/map";
import { every } from "../src/every";

describe("endsWith", () => {
  const string = "abc";

  it("should return `true` if a string ends with `target`", () => {
    assert.strictEqual(endsWith(string, "c"), true);
  });

  it("should return `false` if a string does not end with `target`", () => {
    assert.strictEqual(endsWith(string, "b"), false);
  });

  it("should work with a `position`", () => {
    assert.strictEqual(endsWith(string, "b", 2), true);
  });

  it("should work with `position` >= `length`", () => {
    each([3, 5, MAX_SAFE_INTEGER, Infinity], (position) => {
      assert.strictEqual(endsWith(string, "c", position), true);
    });
  });

  it("should treat falsey `position` values, except `undefined`, as `0`", () => {
    const expected = map(falsey, stubTrue);

    const actual = map(falsey, (position) => endsWith(string, position === undefined ? "c" : "", position));

    assert.deepStrictEqual(actual, expected);
  });

  it("should treat a negative `position` as `0`", () => {
    each([-1, -3, -Infinity], (position) => {
      assert.ok(every(string, (chr) => !endsWith(string, chr, position)));
      assert.strictEqual(endsWith(string, "", position), true);
    });
  });

  it("should coerce `position` to an integer", () => {
    assert.strictEqual(endsWith(string, "ab", 2.2), true);
  });

});
