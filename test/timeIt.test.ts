
import { timeIt } from "../src/functional/timeIt";
import { sleep } from "../src/sleep";
describe("timeIt", () => {

  it("should support async function", async () => {

    const t = await timeIt(async () => {
      await sleep(100);
      for (let idx = 1; idx < 10000; idx++) {
        expect(idx).toBeGreaterThan(0);
      }
    });
    expect(t).toBeGreaterThan(100);

  });

  it("should support sync function", () => {
    const t = timeIt(() => {
      for (let idx = 1; idx < 10000; idx++) {
        expect(idx).toBeGreaterThan(0);
      }
    });
    expect(t).toBeGreaterThan(0);
  });

});
