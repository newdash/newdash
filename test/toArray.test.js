import * as assert from "assert";
import { arrayProto } from "./utils";
import toArray from "../src/toArray";

describe("toArray", () => {
  it("should convert objects to arrays", () => {
    assert.deepStrictEqual(toArray({ "a": 1, "b": 2 }), [1, 2]);
  });

  it("should convert iterables to arrays", () => {
    if (Symbol && Symbol.iterator) {
      const object = { "0": "a", "length": 1 };
      object[Symbol.iterator] = arrayProto[Symbol.iterator];

      assert.deepStrictEqual(toArray(object), ["a"]);
    }
  });

  it("should convert maps to arrays", () => {
    if (Map) {
      const map = new Map;
      map.set("a", 1);
      map.set("b", 2);
      assert.deepStrictEqual(toArray(map), [["a", 1], ["b", 2]]);
    }
  });

  it("should convert strings to arrays", () => {
    assert.deepStrictEqual(toArray(""), []);
    assert.deepStrictEqual(toArray("ab"), ["a", "b"]);
    assert.deepStrictEqual(toArray(Object("ab")), ["a", "b"]);
  });

});
