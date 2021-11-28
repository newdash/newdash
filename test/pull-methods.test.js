import * as assert from "assert";
import { pull } from "../src/pull";
import { pullAll } from "../src/pullAll";
import { pullAllWith } from "../src/pullAllWith";
import each from "../src/each";

describe("pull methods", () => {

  each([["pull", pull], ["pullAll", pullAll], ["pullAllWith", pullAllWith]], ([methodName, func]) => {
    const isPull = methodName == "pull";

    function testFunc(array, values) {
      return isPull
        ? func.apply(undefined, [array].concat(values))
        : func(array, values);
    }

    it(`\`_.${methodName}\` should modify and return the array`, () => {
      const array = [1, 2, 3],
        actual = testFunc(array, [1, 3]);

      assert.strictEqual(actual, array);
      assert.deepStrictEqual(array, [2]);
    });

    it(`\`_.${methodName}\` should preserve holes in arrays`, () => {
      const array = [1, 2, 3, 4];
      delete array[1];
      delete array[3];

      testFunc(array, [1]);
      assert.ok(!("0" in array));
      assert.ok(!("2" in array));
    });

    it(`\`_.${methodName}\` should treat holes as \`undefined\``, () => {
      const array = [1, 2, 3];
      delete array[1];

      testFunc(array, [undefined]);
      assert.deepStrictEqual(array, [1, 3]);
    });

    it(`\`_.${methodName}\` should match \`NaN\``, () => {
      const array = [1, NaN, 3, NaN];

      testFunc(array, [NaN]);
      assert.deepStrictEqual(array, [1, 3]);
    });
  });
});
