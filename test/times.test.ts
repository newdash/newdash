import * as assert from "assert";
import identity from "../src/.internal/identity";
import constant from "../src/constant";
import each from "../src/each";
import map from "../src/map";
import times from "../src/times";
import { doubled, falsey, slice, stubArray } from "./utils";

describe("times", () => {
  it("should coerce non-finite `n` values to `0`", () => {
    each([-Infinity, NaN, Infinity], (n) => {
      assert.deepStrictEqual(times(n), []);
    });
  });

  it("should coerce `n` to an integer", () => {
    const actual = times(2.6, identity);
    assert.deepStrictEqual(actual, [0, 1]);
  });

  it("should provide correct `iteratee` arguments", () => {
    let args;

    times(1, function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [0]);
  });

  it("should use `_.identity` when `iteratee` is nullish", () => {
    const values = [, null, undefined],
      expected = map(values, constant([0, 1, 2]));

    const actual = map(values, (value, index) => index ? times(3, value) : times(3));

    assert.deepStrictEqual(actual, expected);
  });

  it("should return an array of the results of each `iteratee` execution", () => {
    assert.deepStrictEqual(times(3, doubled), [0, 2, 4]);
  });

  it("should return an empty array for falsey and negative `n` values", () => {
    const values = falsey.concat(-1, -Infinity),
      expected = map(values, stubArray);

    // @ts-ignore
    const actual = map(values, (value, index) => index ? times(value) : times());

    assert.deepStrictEqual(actual, expected);
  });

});
