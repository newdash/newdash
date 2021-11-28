import * as assert from "assert";
import { falsey, LARGE_ARRAY_SIZE, isEven } from "./utils";
import take from "../src/take";
import map from "../src/map";
import each from "../src/each";

describe("take", () => {

  const array = [1, 2, 3];

  it("should take the first two elements", () => {
    assert.deepStrictEqual(take(array, 2), [1, 2]);
  });

  it("should treat falsey `n` values, except `undefined`, as `0`", () => {
    const expected = map(falsey, (value) => value === undefined ? [1] : []);

    const actual = map(falsey, (n) => take(array, n));

    assert.deepStrictEqual(actual, expected);
  });

  it("should return an empty array when `n` < `1`", () => {
    each([0, -1, -Infinity], (n) => {
      assert.deepStrictEqual(take(array, n), []);
    });
  });

  it("should return all elements when `n` >= `length`", () => {
    each([3, 4, Math.pow(2, 32), Infinity], (n) => {
      assert.deepStrictEqual(take(array, n), array);
    });
  });

  it("should work as an iteratee for methods like `_.map`", () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      actual = map(array, take);

    assert.deepStrictEqual(actual, [[1], [4], [7]]);
  });


});
