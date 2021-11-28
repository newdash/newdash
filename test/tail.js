import * as assert from "assert";
import lodashStable from "lodash";
import tail from "../src/tail";
import { falsey, stubArray } from "./utils";

describe("tail", () => {

  const array = [1, 2, 3];

  it("should accept a falsey `array`", () => {
    const expected = lodashStable.map(falsey, stubArray);

    const actual = lodashStable.map(falsey, (array, index) => {
      try {
        return index ? tail(array) : tail();
      } catch (e) { }
    });

    assert.deepStrictEqual(actual, expected);
  });

  it("should exclude the first element", () => {
    assert.deepStrictEqual(tail(array), [2, 3]);
  });

  it("should return an empty when querying empty arrays", () => {
    assert.deepStrictEqual(tail([]), []);
  });

  it("should work as an iteratee for methods like `_.map`", () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      actual = lodashStable.map(array, tail);

    assert.deepStrictEqual(actual, [[2, 3], [5, 6], [8, 9]]);
  });


});
