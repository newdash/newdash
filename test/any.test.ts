
import * as assert from "assert";
import { any } from "../src/any";
import { assertShouldThrowError } from "./helpers";


async function asyncValue(value?: string | Error): Promise<string> {
  if (value instanceof Error) {
    throw value;
  } else {
    return value;
  }
}


describe("any", () => {

  it("should collect response when any errors", async() => {

    const e1 = new Error();
    const e2 = new Error();

    assert.strictEqual(
      await any([asyncValue(e1), asyncValue("msg")]),
      "msg"
    );

    await assertShouldThrowError(async() => {
      try {
        await any([asyncValue(e1), asyncValue(e2)]);
      } catch (error) {
        assert.deepStrictEqual(error, [e1, e2]);
        throw new Error("");
      }
    });

  });

});


