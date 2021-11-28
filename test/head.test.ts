import * as assert from "assert";
import first from "../src/first";
import head from "../src/head";
import map from "../src/map";

describe("head", () => {

  const arrayProto = Array.prototype;

  const array = [1, 2, 3, 4];

  it("should return the first element", () => {
    assert.strictEqual(head(array), 1);
  });

  it("should return `undefined` when querying empty arrays", () => {
    arrayProto[0] = 1;
    assert.strictEqual(head([]), undefined);
    assert.strictEqual(first([]), undefined);
    arrayProto.length = 0;
  });

  it("should work as an iteratee for methods like `_.map`", () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      actual = map(array, head);

    assert.deepStrictEqual(actual, [1, 4, 7]);
  });

  it("should process string", () => {

    assert.strictEqual(first("abc"), "a");
    assert.strictEqual(head("abc"), "a");

  });

});
