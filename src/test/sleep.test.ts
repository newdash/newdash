import { sleep } from "../sleep";
import assert from "assert";

describe('sleep', () => {

  const testSleepMS = 50

  it('should sleep in async function', async () => {

    const t1 = new Date()
    await sleep(testSleepMS)

    // @ts-ignore
    const diff = Math.abs(new Date() - t1)

    assert.ok(diff >= testSleepMS)

  });


});
