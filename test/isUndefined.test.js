import * as assert from "assert";
import lodashStable from "../src";
import isUndefined from "../src/isUndefined";
import { args, falsey, realm, slice, symbol } from "./utils";

describe("isUndefined", () => {
  it("should return `true` for `undefined` values", () => {
    assert.strictEqual(isUndefined(), true);
    assert.strictEqual(isUndefined(undefined), true);
  });

  it("should return `false` for non `undefined` values", () => {
    const expected = lodashStable.map(falsey, (value) => value === undefined);

    const actual = lodashStable.map(falsey, (value, index) => index ? isUndefined(value) : isUndefined());

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isUndefined(args), false);
    assert.strictEqual(isUndefined([1, 2, 3]), false);
    assert.strictEqual(isUndefined(true), false);
    assert.strictEqual(isUndefined(new Date), false);
    assert.strictEqual(isUndefined(new Error), false);
    assert.strictEqual(isUndefined(_), false);
    assert.strictEqual(isUndefined(slice), false);
    assert.strictEqual(isUndefined({ "a": 1 }), false);
    assert.strictEqual(isUndefined(1), false);
    assert.strictEqual(isUndefined(/x/), false);
    assert.strictEqual(isUndefined("a"), false);

    if (Symbol) {
      assert.strictEqual(isUndefined(symbol), false);
    }
  });

  it("should work with `undefined` from another realm", () => {
    if (realm.object) {
      assert.strictEqual(isUndefined(realm.undefined), true);
    }
  });
});
