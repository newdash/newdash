import * as assert from "assert";
import lodashStable from "../src";
import escapeRegExp from "../src/escapeRegExp";
import { stubString } from "./utils";

describe("escapeRegExp", () => {
  const escaped = "\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\",
    unescaped = "^$.*+?()[]{}|\\";

  it("should escape values", () => {
    assert.strictEqual(escapeRegExp(unescaped + unescaped), escaped + escaped);
  });

  it("should handle strings with nothing to escape", () => {
    assert.strictEqual(escapeRegExp("abc"), "abc");
  });

  it("should return an empty string for empty values", () => {
    const values = [, null, undefined, ""],
      expected = lodashStable.map(values, stubString);

    const actual = lodashStable.map(values, (value, index) => index ? escapeRegExp(value) : escapeRegExp());

    assert.deepStrictEqual(actual, expected);
  });
});
