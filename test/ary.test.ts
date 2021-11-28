import * as assert from "assert";
import { slice } from "./utils";
import curry from "../src/curry";
import rearg from "../src/rearg";
import ary from "../src/ary";
import map from "../src/map";
import includes from "../src/includes";

describe("ary", () => {

  function fn(a: any, b: any, c: any): any {
    return slice.call(arguments);
  }

  it("should cap the number of arguments provided to `func`", () => {
    const actual = map(["6", "8", "10"], ary(parseInt, 1));
    assert.deepStrictEqual(actual, [6, 8, 10]);

    const capped = ary(fn, 2);
    assert.deepStrictEqual(capped("a", "b", "c", "d"), ["a", "b"]);
  });

  it("should use `func.length` if `n` is not given", () => {
    const capped = ary(fn);
    assert.deepStrictEqual(capped("a", "b", "c", "d"), ["a", "b", "c"]);
  });

  it("should treat a negative `n` as `0`", () => {
    const capped = ary(fn, -1);

    try {
      var actual = capped("a");
    } catch (e) { }

    assert.deepStrictEqual(actual, []);
  });

  it("should coerce `n` to an integer", () => {
    const values = ["1", 1.6, "xyz"],
      expected = [["a"], ["a"], []];

    const actual = map(values, (n) => {
      const capped = ary(fn, n);
      return capped("a", "b");
    });

    assert.deepStrictEqual(actual, expected);
  });

  it("should not force a minimum argument count", () => {
    const args = ["a", "b", "c"],
      capped = ary(fn, 3);

    const expected = map(args, (arg, index) => args.slice(0, index));

    const actual = map(expected, (array) => capped.apply(undefined, array));

    assert.deepStrictEqual(actual, expected);
  });

  it("should use `this` binding of function", () => {
    const capped = ary(function(a, b) { return this; }, 1),
      object = { "capped": capped };

    assert.strictEqual(object.capped(), object);
  });

  it("should use the existing `ary` if smaller", () => {
    const capped = ary(ary(fn, 1), 2);
    assert.deepStrictEqual(capped("a", "b", "c"), ["a"]);
  });

  it("should work as an iteratee for methods like `_.map`", () => {
    const funcs = map([fn], ary),
      actual = funcs[0]("a", "b", "c");

    assert.deepStrictEqual(actual, ["a", "b", "c"]);
  });

  it("should work when combined with other methods that use metadata", () => {
    const array = ["a", "b", "c"];
    const i2 = curry(rearg(ary(includes, 2), 1, 0), 2);
    assert.strictEqual(i2("b")(array, 2), true);

  });

});
