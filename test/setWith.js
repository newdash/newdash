import * as assert from "assert";
import lodashStable from "../src";
import setWith from "../src/setWith";
import { noop } from "./utils";

describe("setWith", () => {
  it("should work with a `customizer` callback", () => {
    const actual = setWith({ "0": {} }, "[0][1][2]", 3, (value) => lodashStable.isObject(value) ? undefined : {});

    assert.deepStrictEqual(actual, { "0": { "1": { "2": 3 } } });
  });

  it("should work with a `customizer` that returns `undefined`", () => {
    const actual = setWith({}, "a[0].b.c", 4, noop);
    assert.deepStrictEqual(actual, { "a": [{ "b": { "c": 4 } }] });
  });
});
