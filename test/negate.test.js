import * as assert from "assert";
import negate, { negate as fNegate } from "../src/negate";
import times from "../src/times";
import { assertShouldThrowError } from "./helpers";
import { isEven, stubTrue } from "./utils";

describe("negate", () => {
  it("should create a function that negates the result of `func`", () => {
    const negate = fNegate(isEven);

    assert.strictEqual(negate(1), true);
    assert.strictEqual(negate(2), false);
  });

  it("should create a function that negates the result of `func`", () => {
    const negate = fNegate(isEven);

    assert.strictEqual(negate(1), true);
    assert.strictEqual(negate(2), false);
  });

  it("should create a function that accepts multiple arguments", () => {
    let argCount,
      count = 5,
      negate = fNegate(function() { argCount = arguments.length; }),
      expected = times(count, stubTrue);

    const actual = times(count, (index) => {
      switch (index) {
        case 0: negate(); break;
        case 1: negate(1); break;
        case 2: negate(1, 2); break;
        case 3: negate(1, 2, 3); break;
        case 4: negate(1, 2, 3, 4);
      }
      return argCount == index;
    });

    assert.deepStrictEqual(actual, expected);
  });

  it("should raise type error when input wrong", () => {
    assertShouldThrowError(() => { negate(undefined); }, TypeError);
  });
});
