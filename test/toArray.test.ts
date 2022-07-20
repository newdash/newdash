import * as assert from "assert";
import toArray from "../src/toArray";
import { arrayProto } from "./utils";

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
      const map: Map<String, Number> = new Map();
      map.set("a", 1);
      map.set("b", 2);
      assert.deepStrictEqual(toArray(map), [["a", 1], ["b", 2]]);
    }
  });


  it("should convert set to arrays", () => {
    if (Set) {
      const set: Set<string> = new Set();
      set.add('a')
      set.add('b')
      assert.deepStrictEqual(toArray(set), ['a', 'b']);
    }
  });


  it("should convert strings to arrays", () => {
    assert.deepStrictEqual(toArray(""), []);
    assert.deepStrictEqual(toArray(null), []);
    assert.deepStrictEqual(toArray("ab"), ["a", "b"]);
    assert.deepStrictEqual(toArray(Object("ab")), ["a", "b"]);
  });

});
