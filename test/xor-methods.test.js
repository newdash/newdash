import * as assert from "assert";
import { args } from "./utils";
import each from "../src/each";
import xor from "../src/xor";


describe("xor methods", () => {

  each([["xor", xor]], ([methodName, func]) => {

    it(`\`_.${methodName}\` should return the symmetric difference of two arrays`, () => {
      const actual = func([2, 1], [2, 3]);
      assert.deepStrictEqual(actual, [1, 3]);
    });

    it(`\`_.${methodName}\` should return the symmetric difference of multiple arrays`, () => {
      let actual = func([2, 1], [2, 3], [3, 4]);
      assert.deepStrictEqual(actual, [1, 4]);

      actual = func([1, 2], [2, 1], [1, 2]);
      assert.deepStrictEqual(actual, []);
    });

    it(`\`_.${methodName}\` should return an empty array when comparing the same array`, () => {
      const array = [1],
        actual = func(array, array, array);

      assert.deepStrictEqual(actual, []);
    });

    it(`\`_.${methodName}\` should return an array of unique values`, () => {
      let actual = func([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
      assert.deepStrictEqual(actual, [1, 4]);

      actual = func([1, 1]);
      assert.deepStrictEqual(actual, [1]);
    });

    it(`\`_.${methodName}\` should return a new array when a single array is given`, () => {
      const array = [1];
      assert.notStrictEqual(func(array), array);
    });

    it(`\`_.${methodName}\` should ignore individual secondary arguments`, () => {
      const array = [0];
      assert.deepStrictEqual(func(array, 3, null, { "0": 1 }), array);
    });

    it(`\`_.${methodName}\` should ignore values that are not arrays or \`arguments\` objects`, () => {
      const array = [1, 2];
      assert.deepStrictEqual(func(array, 3, { "0": 1 }, null), array);
      assert.deepStrictEqual(func(null, array, null, [2, 3]), [1, 3]);
      assert.deepStrictEqual(func(array, null, args, null), [3]);
    });


  });

});
