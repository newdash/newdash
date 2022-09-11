import * as assert from "assert";
import lodashStable from "../src";
import defaultTo from "../src/defaultTo";
import { falsey } from "./utils";

describe("defaultTo", () => {
  it("should return a default value if `value` is `NaN` or nullish", () => {
    const expected = lodashStable.map(falsey, (value) => (value == null || value !== value) ? 1 : value);

    const actual = lodashStable.map(falsey, (value) => defaultTo(value, 1));

    assert.deepStrictEqual(actual, expected);
  });
});
