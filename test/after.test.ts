import * as assert from "assert";
import times from "../src/times";
import after from "../src/after";
import { assertShouldThrowError } from "./helpers";

describe("after", () => {

  function testAfter(n: number, ts: number) {
    let count = 0;
    times(ts, after(n, () => { count++; }));
    return count;
  }

  it("should create a function that invokes `func` after `n` calls", () => {
    assert.strictEqual(testAfter(5, 5), 1, "after(n) should invoke `func` after being called `n` times");
    assert.strictEqual(testAfter(5, 4), 0, "after(n) should not invoke `func` before being called `n` times");
    assert.strictEqual(testAfter(0, 0), 0, "after(0) should not invoke `func` immediately");
    assert.strictEqual(testAfter(0, 1), 1, "after(0) should invoke `func` when called once");
  });

  it("should coerce `n` values of `NaN` to `0`", () => {
    assert.strictEqual(testAfter(NaN, 1), 1);
  });

  it("should use `this` binding of function", () => {
    const afterFn = after(1, function() {
      // @ts-ignore
      return ++(this as typeof object).count;
    });
    const object = { "after": afterFn, "count": 0 };

    object.after();
    assert.strictEqual(object.after(), 2);
    assert.strictEqual(object.count, 2);
  });

  it("should raise type error when parameter wrong", () => {

    assertShouldThrowError(() => { after(1, undefined); }, TypeError);

  });

});
