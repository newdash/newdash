// @ts-nocheck
import assert from "assert";
import { platform } from "os";
import { TimeoutError } from "../src/assert/errors";
import { createTimeoutPromise } from "../src/timeout";
import { assertShouldThrowError } from "./helpers";

let describe2 = describe;
if (platform() !== "linux") {
  // setTimeout is Unstable on MacOS/Windows,
  // maybe caused by resource schedule,
  // so skip these tests
  describe2 = describe.skip;
}

describe2("timeout", () => {

  it("should support raise error on timeout", async () => {

    await assertShouldThrowError(
      () => createTimeoutPromise((resolve) => { setTimeout(resolve, 1000); }, 500),
      TimeoutError
    );

  });

  it("should support raise original error when time is enough", async () => {

    await assertShouldThrowError(
      () => createTimeoutPromise((resolve, reject) => {
        setTimeout(() => { reject(new TypeError); }, 500);
      }, 1000),
      TypeError
    );

  });

  it("should support process correct when time is enough", async () => {

    const testValue = 123456;

    const value = await createTimeoutPromise((resolve) => {
      setTimeout(() => { resolve(testValue); }, 500);
    }, 1000);

    assert.strictEqual(value, testValue);


  });


});
