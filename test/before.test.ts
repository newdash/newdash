import * as assert from "assert";
import before from "../src/before";
import times from "../src/times";

describe("before", () => {

  const testBefore = (n, ts) => {
    let count = 0;
    times(ts, before(n, () => { count++; }));
    return count;
  };

  it("should create a function that invokes `func` after `n` calls", () => {
    assert.strictEqual(testBefore(5, 4), 4, "before(n) should invoke `func` before being called `n` times");
    assert.strictEqual(testBefore(5, 6), 4, "before(n) should not invoke `func` after being called `n - 1` times");
    assert.strictEqual(testBefore(0, 0), 0, "before(0) should not invoke `func` immediately");
    assert.strictEqual(testBefore(0, 1), 0, "before(0) should not invoke `func` when called");
  });

  it("should coerce `n` values of `NaN` to `0`", () => {
    assert.strictEqual(testBefore(NaN, 1), 0);
  });

  it("should use `this` binding of function", () => {
    const object = { "before": before(2, function() { return ++this.count; }), "count": 0 };
    object.before();
    assert.strictEqual(object.before(), 1);
    assert.strictEqual(object.count, 1);
  });


});
