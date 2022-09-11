import * as assert from "assert";
import lodashStable from "../src";
import { freeze, isStrict, _ } from "./utils";

describe("strict mode checks", () => {
  lodashStable.each(["assign", "assignIn", "bindAll", "defaults", "defaultsDeep", "merge"], (methodName) => {
    const func = _[methodName],
      isBindAll = methodName == "bindAll";

    it(`\`_.${methodName}\` should ${isStrict ? "" : "not "}throw strict mode errors`, () => {
      let object = freeze({ "a": undefined, "b": function() {} }),
        pass = !isStrict;

      try {
        func(object, isBindAll ? "b" : { "a": 1 });
      } catch (e) {
        pass = !pass;
      }
      assert.ok(pass);
    });
  });
});
