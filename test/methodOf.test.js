import * as assert from "assert";
import { stubOne, _, stubTwo, stubThree, stubFour, noop, slice } from "./utils";
import constant from "../src/constant";
import each from "../src/each";
import times from "../src/times";
import map from "../src/map";
import { methodOf as fMethodOf } from "../src/methodOf";

describe("methodOf", () => {
  it("should create a function that calls a method of a given key", () => {
    const object = { "a": stubOne };

    each(["a", ["a"]], (path) => {
      const methodOf = fMethodOf(object);
      assert.strictEqual(methodOf.length, 1);
      assert.strictEqual(methodOf(path), 1);
    });
  });

  it("should work with deep property values", () => {
    const object = { "a": { "b": stubTwo } };

    each(["a.b", ["a", "b"]], (path) => {
      const methodOf = fMethodOf(object);
      assert.strictEqual(methodOf(path), 2);
    });
  });

  it("should work with a non-string `path`", () => {
    const array = times(3, constant);

    each([1, [1]], (path) => {
      const methodOf = fMethodOf(array);
      assert.strictEqual(methodOf(path), 1);
    });
  });

  it("should coerce `path` to a string", () => {
    function fn() {}
    fn.toString = constant("fn");

    const expected = [1, 2, 3, 4],
      object = { "null": stubOne, "undefined": stubTwo, "fn": stubThree, "[object Object]": stubFour },
      paths = [null, undefined, fn, {}];

    times(2, (index) => {
      const actual = map(paths, (path) => {
        const methodOf = fMethodOf(object);
        return methodOf(index ? [path] : path);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it("should work with inherited property values", () => {
    function Foo() {}
    Foo.prototype.a = stubOne;

    each(["a", ["a"]], (path) => {
      const methodOf = fMethodOf(new Foo);
      assert.strictEqual(methodOf(path), 1);
    });
  });

  it("should use a key over a path", () => {
    const object = { "a.b": stubOne, "a": { "b": stubTwo } };

    each(["a.b", ["a.b"]], (path) => {
      const methodOf = fMethodOf(object);
      assert.strictEqual(methodOf(path), 1);
    });
  });

  it("should return `undefined` when `object` is nullish", () => {
    const values = [, null, undefined],
      expected = map(values, noop);

    each(["constructor", ["constructor"]], (path) => {
      const actual = map(values, (value, index) => {
        const methodOf = index ? fMethodOf() : fMethodOf(value);
        return methodOf(path);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it("should return `undefined` for deep paths when `object` is nullish", () => {
    const values = [, null, undefined],
      expected = map(values, noop);

    each(["constructor.prototype.valueOf", ["constructor", "prototype", "valueOf"]], (path) => {
      const actual = map(values, (value, index) => {
        const methodOf = index ? fMethodOf() : fMethodOf(value);
        return methodOf(path);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });

  it("should return `undefined` if parts of `path` are missing", () => {
    const object = {},
      methodOf = fMethodOf(object);

    each(["a", "a[1].b.c", ["a"], ["a", "1", "b", "c"]], (path) => {
      assert.strictEqual(methodOf(path), undefined);
    });
  });

  it("should apply partial arguments to function", () => {
    const object = {
      "fn": function() {
        return slice.call(arguments);
      }
    };

    const methodOf = fMethodOf(object, 1, 2, 3);

    each(["fn", ["fn"]], (path) => {
      assert.deepStrictEqual(methodOf(path), [1, 2, 3]);
    });
  });

  it("should invoke deep property methods with the correct `this` binding", () => {
    const object = { "a": { "b": function() { return this.c; }, "c": 1 } },
      methodOf = fMethodOf(object);

    each(["a.b", ["a", "b"]], (path) => {
      assert.strictEqual(methodOf(path), 1);
    });
  });
});
