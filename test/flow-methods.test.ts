import * as assert from "assert";
import { ary } from "../src/ary";
import { curry } from "../src/curry";
import { each } from "../src/each";
import { flow } from "../src/flow";
import { flowRight } from "../src/flowRight";
import { head } from "../src/head";
import { map } from "../src/map";
import { uniq } from "../src/uniq";
import { add, identity, noop, square } from "./utils";

const methods = {
  flow,
  flowRight
};

describe("flow methods", () => {
  each(["flow", "flowRight"], (methodName) => {
    const func = methods[methodName],
      isFlow = methodName == "flow";

    it(`\`_.${methodName}\` should supply each function with the return value of the previous`, () => {
      const fixed = function (n) { return n.toFixed(1); },
        combined = isFlow ? func(add, square, fixed) : func(fixed, square, add);

      assert.strictEqual(combined(1, 2), "9.0");
    });

    it(`\`_.${methodName}\` should return a new function`, () => {
      assert.notStrictEqual(func(noop), noop);
    });

    it(`\`_.${methodName}\` should work with a curried function and \`_.head\``, () => {
      const curried = curry(identity);

      const combined = isFlow
        ? func(head, curried)
        : func(curried, head);

      assert.strictEqual(combined([1]), 1);
    });

    it(`\`_.${methodName}\` should work with curried functions with placeholders`, () => {
      const curried = curry(ary(map, 2), 2),
        // @ts-ignore
        getProp = curried(curried.placeholder, (value) => value.a),
        objects = [{ "a": 1 }, { "a": 2 }, { "a": 1 }];

      const combined = isFlow
        ? func(getProp, uniq)
        : func(uniq, getProp);

      assert.deepStrictEqual(combined(objects), [1, 2]);

    });
  });
});
