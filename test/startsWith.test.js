import * as assert from "assert";
import each from "../src/each";
import map from "../src/map";
import startsWith from "../src/startsWith";
import { falsey, MAX_SAFE_INTEGER, stubTrue } from "./utils";

describe("startsWith", () => {
  const string = "abc";

  it("should return `true` if a string starts with `target`", () => {
    assert.strictEqual(startsWith(string, "a"), true);
  });

  it("should return `false` if a string does not start with `target`", () => {
    assert.strictEqual(startsWith(string, "b"), false);
  });

  it("should work with a `position`", () => {
    assert.strictEqual(startsWith(string, "b", 1), true);
  });

  it("should work with `position` >= `length`", () => {
    each([3, 5, MAX_SAFE_INTEGER, Infinity], (position) => {
      assert.strictEqual(startsWith(string, "a", position), false);
    });
  });

  it("should treat falsey `position` values as `0`", () => {
    const expected = map(falsey, stubTrue);

    const actual = map(falsey, (position) => startsWith(string, "a", position));

    assert.deepStrictEqual(actual, expected);
  });

  it("should treat a negative `position` as `0`", () => {
    each([-1, -3, -Infinity], (position) => {
      assert.strictEqual(startsWith(string, "a", position), true);
      assert.strictEqual(startsWith(string, "b", position), false);
    });
  });

  it("should coerce `position` to an integer", () => {
    assert.strictEqual(startsWith(string, "bc", 1.2), true);
  });
});
