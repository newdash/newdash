import * as assert from "assert";
import { falsey } from "./utils";
import takeRight from "../src/takeRight";
import map from "../src/map";
import each from "../src/each";

describe("takeRight", () => {

  const array = [1, 2, 3];

  it("should take the last two elements", () => {
    assert.deepStrictEqual(takeRight(array, 2), [2, 3]);
  });

  it("should treat falsey `n` values, except `undefined`, as `0`", () => {
    const expected = map(falsey, (value) => value === undefined ? [3] : []);

    const actual = map(falsey, (n) => takeRight(array, n));

    assert.deepStrictEqual(actual, expected);
  });

  it("should return an empty array when `n` < `1`", () => {
    each([0, -1, -Infinity], (n) => {
      assert.deepStrictEqual(takeRight(array, n), []);
    });
  });

  it("should return all elements when `n` >= `length`", () => {
    each([3, 4, Math.pow(2, 32), Infinity], (n) => {
      assert.deepStrictEqual(takeRight(array, n), array);
    });
  });

  it("should work as an iteratee for methods like `_.map`", () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      actual = map(array, takeRight);

    assert.deepStrictEqual(actual, [[3], [6], [9]]);
  });


});
