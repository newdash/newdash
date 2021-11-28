import * as assert from "assert";
import { constant as srcConstant } from "../src/constant";
import { every } from "../src/every";
import { map } from "../src/map";
import { empties, falsey, stubTrue } from "./utils";


describe("constant", () => {

  it("should create a function that returns `value`", () => {
    const object = { "a": 1 },
      values = Array(2).concat(empties, true, 1, "a"),
      constant = srcConstant(object);

    const results = map(values, (value, index) => {
      if (index < 2) {
        return index ? constant.call({}) : constant();
      }
      // @ts-ignore
      return constant(value);
    });

    assert.ok(every(results, (result) => result === object));
  });

  it("should work with falsey values", () => {
    const expected = map(falsey, stubTrue);

    const actual = map(falsey, (value, index) => {
      const constant = index ? srcConstant(value) : srcConstant(),
        result = constant();

      return (result === value) || (result !== result && value !== value);
    });

    assert.deepStrictEqual(actual, expected);
  });

});
