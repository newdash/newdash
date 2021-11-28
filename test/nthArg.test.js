import * as assert from "assert";
import { falsey, stubA, stubB, noop } from "./utils";
import nthArg from "../src/nthArg";
import map from "../src/map";
import range from "../src/range";

describe("nthArg", () => {
  const args = ["a", "b", "c", "d"];

  it("should create a function that returns its nth argument", () => {
    const actual = map(args, (value, index) => {
      const func = nthArg(index);
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, args);
  });

  it("should work with a negative `n`", () => {
    const actual = map(range(1, args.length + 1), (n) => {
      const func = nthArg(-n);
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, ["d", "c", "b", "a"]);
  });

  it("should coerce `n` to an integer", () => {
    let values = falsey,
      expected = map(values, stubA);

    let actual = map(values, (n) => {
      const func = n ? nthArg(n) : nthArg();
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, expected);

    values = ["1", 1.6];
    expected = map(values, stubB);

    actual = map(values, (n) => {
      const func = nthArg(n);
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it("should return `undefined` for empty arrays", () => {
    const func = nthArg(1);
    assert.strictEqual(func(), undefined);
  });

  it("should return `undefined` for non-indexes", () => {
    const values = [Infinity, args.length],
      expected = map(values, noop);

    const actual = map(values, (n) => {
      const func = nthArg(n);
      return func.apply(undefined, args);
    });

    assert.deepStrictEqual(actual, expected);
  });

});
