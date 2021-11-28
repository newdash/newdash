import * as assert from "assert";
import each from "../src/each";
import range from "../src/range";


import { maxBy } from "../src/maxBy";
import { max } from "../src/max";
import { minBy } from "../src/minBy";
import { min } from "../src/min";


describe("extremum methods", () => {

  each([["max", max], ["maxBy", maxBy], ["min", min], ["minBy", minBy]], ([methodName, func]) => {

    const isMax = /^max/.test(methodName);

    it(`\`_.${methodName}\` should work with Date objects`, () => {
      const curr = new Date,
        past = new Date(0);

      assert.strictEqual(func([curr, past]), isMax ? curr : past);
    });

    it(`\`_.${methodName}\` should work with extremely large arrays`, () => {
      const array = range(0, 5e5);
      assert.strictEqual(func(array), isMax ? 499999 : 0);
    });

  });

  each([["maxBy", maxBy], ["minBy", minBy]], ([methodName, func]) => {
    const array = [1, 2, 3],
      isMax = methodName == "maxBy";

    it(`\`_.${methodName}\` should work with an \`iteratee\``, () => {
      const actual = func(array, (n) => -n);

      assert.strictEqual(actual, isMax ? 1 : 3);
    });

    it("should work with `_.property` shorthands", () => {
      let objects = [{ "a": 2 }, { "a": 3 }, { "a": 1 }],
        actual = func(objects, "a");

      assert.deepStrictEqual(actual, objects[isMax ? 1 : 2]);

      const arrays = [[2], [3], [1]];
      actual = func(arrays, 0);

      assert.deepStrictEqual(actual, arrays[isMax ? 1 : 2]);
    });

    it(`\`_.${methodName}\` should work when \`iteratee\` returns +/-Infinity`, () => {
      const value = isMax ? -Infinity : Infinity,
        object = { "a": value };

      const actual = func([object, { "a": value }], (object) => object.a);

      assert.strictEqual(actual, object);
    });
  });
});
