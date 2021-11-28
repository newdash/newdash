import * as assert from "assert";
import { empties, noop } from "./utils";
import sample from "../src/sample";
import { includes } from "../src/includes";
import { map } from "../src/map";
import { transform } from "../src/transform";

describe("sample", () => {

  const array = [1, 2, 3];

  it("should return a random element", () => {
    const actual = sample(array);
    assert.ok(includes(array, actual));
  });

  it("should return `undefined` when sampling empty collections", () => {
    const expected = map(empties, noop);

    const actual = transform(empties, (result, value) => {
      try {
        result.push(sample(value));
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

});
