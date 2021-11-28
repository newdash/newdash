import * as assert from "assert";
import { falsey, stubThree } from "./utils";
import repeat from "../src/repeat";
import { map } from "../src/map";
import constant from "../src/constant";

describe("repeat", () => {
  const str = "abc";

  it("should repeat a string `n` times", () => {
    assert.strictEqual(repeat("*", 3), "***");
    assert.strictEqual(repeat(str, 2), "abcabc");
  });

  it("should treat falsey `n` values, except `undefined`, as `0`", () => {
    const expected = map(falsey, (value) => value === undefined ? str : "");

    const actual = map(falsey, (n, index) => index ? repeat(str, n) : repeat(str));

    assert.deepStrictEqual(actual, expected);
  });

  it("should return an empty string if `n` is <= `0`", () => {
    assert.strictEqual(repeat(str, 0), "");
    assert.strictEqual(repeat(str, -2), "");
  });

  it("should coerce `n` to an integer", () => {
    assert.strictEqual(repeat(str, "2"), "abcabc");
    assert.strictEqual(repeat(str, 2.6), "abcabc");
    assert.strictEqual(repeat("*", { "valueOf": stubThree }), "***");
  });

  it("should coerce `string` to a string", () => {
    assert.strictEqual(repeat(Object(str), 2), "abcabc");
    assert.strictEqual(repeat({ "toString": constant("*") }, 3), "***");
  });

  it("should work as an iteratee for methods like `_.map`", () => {
    const actual = map(["a", "b", "c"], repeat);
    assert.deepStrictEqual(actual, ["a", "b", "c"]);
  });

});
