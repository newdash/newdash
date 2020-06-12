
import { any } from "../any";
import assert from "assert";


async function asyncValue(value?: string | Error): Promise<string> {
  if (value instanceof Error) {
    throw value
  } else {
    return value
  }
}


describe('any', () => {

  it('should any errors', async () => {

    const e1 = new Error()
    const e2 = new Error()

    assert.strictEqual(
      await any([
        asyncValue(e1),
        asyncValue("msg")
      ]),
      "msg"
    )

    try {
      await any([asyncValue(e1), asyncValue(e2)])
    } catch (errors) {
      assert.deepStrictEqual(errors, [e1, e2])
    }

  });

});


