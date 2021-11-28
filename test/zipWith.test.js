import * as assert from "assert";
import constant from "../src/constant";
import map from "../src/map";
import zip from "../src/zip";
import zipWith from "../src/zipWith";
import { slice } from "./utils";

describe("zipWith", () => {

  it("should zip arrays combining grouped elements with `iteratee`", () => {
    const array1 = [1, 2, 3],
      array2 = [4, 5, 6],
      array3 = [7, 8, 9];

    let actual = zipWith([array1, array2, array3], (a, b, c) => a + b + c);

    assert.deepStrictEqual(actual, [12, 15, 18]);

    actual = zipWith([array1, []], (a, b) => a + (b || 0));

    assert.deepStrictEqual(actual, [1, 2, 3]);
  });

  it("should provide correct `iteratee` arguments", () => {
    let args;

    zipWith([[1, 2], [3, 4], [5, 6]], function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [1, 3, 5]);
  });

  it("should perform a basic zip when `iteratee` is nullish", () => {
    const array1 = [1, 2],
      array2 = [3, 4],
      values = [, null, undefined],
      expected = map(values, constant(zip(array1, array2)));

    const actual = map(values,
      (value, index) => index ? zipWith([array1, array2, value]) : zipWith([array1, array2])
    );

    assert.deepStrictEqual(actual, expected);

  });

});
