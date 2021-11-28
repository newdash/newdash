import * as assert from "assert";
import { empties, stubZero } from "./utils";
import each from "../src/each";
import map from "../src/map";
import { sum } from "../src/sum";
import { sumBy } from "../src/sumBy";

describe("sum methods", () => {

  each([["sum", sum], ["sumBy", sumBy]], ([methodName, func]) => {

    const array = [6, 4, 2];

    it(`\`_.${methodName}\` should return the sum of an array of numbers`, () => {
      assert.strictEqual(func(array), 12);
    });

    it(`\`_.${methodName}\` should return \`0\` when passing empty \`array\` values`, () => {
      const expected = map(empties, stubZero);

      const actual = map(empties, (value) => func(value));

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`_.${methodName}\` should skip \`undefined\` values`, () => {
      assert.strictEqual(func([1, undefined]), 1);
    });

    it(`\`_.${methodName}\` should not skip \`NaN\` values`, () => {
      assert.deepStrictEqual(func([1, NaN]), NaN);
    });

    it(`\`_.${methodName}\` should not coerce values to numbers`, () => {
      assert.strictEqual(func(["1", "2"]), "12");
    });
  });

});
