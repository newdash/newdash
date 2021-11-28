import * as assert from "assert";
import { constant, each, every, map } from "../src";
import { fill } from "../src/fill";
import { falsey } from "./utils";

describe("fill", () => {
  it("should use a default `start` of `0` and a default `end` of `length`", () => {
    const array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, "a"), ["a", "a", "a"]);
  });

  it(`should use 'undefined' for 'value' if not given`, () => {
    const array = [1, 2, 3],
      actual = fill(array);

    assert.deepStrictEqual(actual, Array(3).fill(undefined));
    assert.ok(every(actual, (value, index) => index in actual));
  });

  it("should work with a positive `start`", () => {
    const array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, "a", 1), [1, "a", "a"]);
  });

  it("should work with a `start` >= `length`", () => {
    each([3, 4, Math.pow(2, 32), Infinity], (start) => {
      const array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, "a", start), [1, 2, 3]);
    });
  });

  it("should treat falsey `start` values as `0`", () => {
    const expected = map(falsey, constant(["a", "a", "a"]));

    const actual = map(falsey, (start) => {
      const array = [1, 2, 3];
      // @ts-ignore
      return fill(array, "a", start);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it("should work with a negative `start`", () => {
    const array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, "a", -1), [1, 2, "a"]);
  });

  it("should work with a negative `start` <= negative `length`", () => {
    each([-3, -4, -Infinity], (start) => {
      const array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, "a", start), ["a", "a", "a"]);
    });
  });

  it("should work with `start` >= `end`", () => {
    each([2, 3], (start) => {
      const array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, "a", start, 2), [1, 2, 3]);
    });
  });

  it("should work with a positive `end`", () => {
    const array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, "a", 0, 1), ["a", 2, 3]);
  });

  it("should work with a `end` >= `length`", () => {
    each([3, 4, Math.pow(2, 32), Infinity], (end) => {
      const array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, "a", 0, end), ["a", "a", "a"]);
    });
  });

  it("should treat falsey `end` values, except `undefined`, as `0`", () => {
    const expected = map(falsey, (value) => value === undefined ? ["a", "a", "a"] : [1, 2, 3]);

    const actual = map(falsey, (end) => {
      const array = [1, 2, 3];
      // @ts-ignore
      return fill(array, "a", 0, end);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it("should work with a negative `end`", () => {
    const array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, "a", 0, -1), ["a", "a", 3]);
  });

  it("should work with a negative `end` <= negative `length`", () => {
    each([-3, -4, -Infinity], (end) => {
      const array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, "a", 0, end), [1, 2, 3]);
    });
  });


  it("should work as an iteratee for methods like `_.map`", () => {
    const array = [[1, 2], [3, 4]],
      actual = map(array, fill);

    assert.deepStrictEqual(actual, [[0, 0], [1, 1]]);
  });

});
