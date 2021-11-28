// @ts-nocheck
import * as assert from "assert";
import { constant } from "../src/constant";
import { each } from "../src/each";
import { map } from "../src/map";
import values from "../src/values";
import { args, strictArgs } from "./utils";


describe("values methods", () => {

  each([["values", values]], ([methodName, func]) => {

    const isValues = methodName == "values";

    it(`\`_.${methodName}\` should get string keyed values of \`object\``, () => {
      const object = { "a": 1, "b": 2 },
        actual = func(object).sort();

      assert.deepStrictEqual(actual, [1, 2]);
    });

    it(`\`_.${methodName}\` should work with an object that has a \`length\` property`, () => {
      const object = { "0": "a", "1": "b", "length": 2 },
        actual = func(object).sort();

      assert.deepStrictEqual(actual, [2, "a", "b"]);
    });

    it(`\`_.${methodName}\` should ${isValues ? "not " : ""}include inherited string keyed property values`, () => {
      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      const expected = isValues ? [1] : [1, 2],
        actual = func(new Foo).sort();

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
      const values = [args, strictArgs],
        expected = map(values, constant([1, 2, 3]));

      const actual = map(values, (value) => func(value).sort());

      assert.deepStrictEqual(actual, expected);
    });

  });
});
