import * as assert from "assert";
import { document } from "./utils";
import map from "../src/map";
import identity from "../src/.internal/identity";
import { stubArray } from "./stubs";
import falsey from "../src/.internal/falsey";
import property from "../src/property";

describe("map", () => {

  const array = [1, 2];

  it("should map values in `collection` to a new array", () => {
    const object = { "a": 1, "b": 2 },
      expected = ["1", "2"];

    assert.deepStrictEqual(map(array), array, "empty mapping");
    assert.deepStrictEqual(map(array, () => { }), new Array(2).fill(undefined));
    assert.deepStrictEqual(map(array, String), expected);
    assert.deepStrictEqual(map(object, String), expected);

  });

  it("should work with `_.property` shorthands", () => {
    const objects = [{ "a": "x" }, { "a": "y" }];
    assert.deepStrictEqual(map(objects, property("a")), ["x", "y"]);
  });

  it("should iterate over own string keyed properties of objects", () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const actual = map(new Foo, identity);
    assert.deepStrictEqual(actual, [1]);
  });

  it("should use `_.identity` when `iteratee` is nullish", () => {
    assert.deepStrictEqual(map(array), array);
  });

  it("should accept a falsey `collection`", () => {
    map(falsey, stubArray);
  });

  it("should treat number values for `collection` as empty", () => {
    assert.deepStrictEqual(map(1), []);
  });

  it("should treat a node list as an array-like object", () => {
    if (document) {
      // @ts-ignore
      const actual = map(document.getElementsByTagName("body"), (element: any) => element.nodeName.toLowerCase());
      assert.deepStrictEqual(actual, ["body"]);
    }
  });

  it("should work with objects with non-number length properties", () => {
    const value = { "value": "x" },
      object = { "length": { "value": "x" } };

    assert.deepStrictEqual(map(object, identity), [value]);
  });


});
