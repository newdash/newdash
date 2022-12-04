// @ts-nocheck
import { any, sleep } from "../src";
import { concurrency } from "../src/concurrency";
import { assertShouldThrowError } from "./helpers";
describe("concurrency", () => {

  it("should support concurrency.limit function", async () => {

    const currLimit = 5;
    let ctx = 0;

    const runner = concurrency.limit(async () => ctx++, currLimit);

    const allRunner = [];

    for (let idx = 0; idx < 15; idx++) {
      allRunner.push(runner().then((v) => {
        expect(ctx).toBeLessThanOrEqual(currLimit);
        ctx--;
        return v;
      }));
    }

    const values = await Promise.all(allRunner);
    expect(values).toHaveLength(15);
    expect(values).not.toBeUndefined();
  });

  it("should support concurrency.limit function on error", async () => {

    class E1 extends Error { }

    const currLimit = 5;
    let ctx = 0;
    let total = 0;
    const max = 15;

    const runner = concurrency.limit(async () => {
      ctx++;
      total++;
      if (total > (max - 2)) {
        throw new E1();
      }
    }, currLimit);

    const allRunner = [];

    for (let idx = 0; idx < max; idx++) {
      allRunner.push(runner().then(() => {
        expect(ctx).toBeLessThanOrEqual(currLimit);
        ctx--;
      }));
    }
    await assertShouldThrowError(() => Promise.all(allRunner), E1);


  });

  it('should support alias of function "any"', () => {
    expect(concurrency.any).toBe(any);
  });

  it('should validate reuse values parameter', async () => {
    expect(() => concurrency.reuse(() => { })).toThrowError()
  });

  it('should support reuse values for async function', async () => {
    const fn = async function () {
      return fn.context_value = (fn.context_value ?? 0) + 1
    }
    const reusedFn = concurrency.reuse(fn, 300)
    await expect(reusedFn()).resolves.toBe(1)
    await expect(reusedFn()).resolves.toBe(1)
    await expect(reusedFn()).resolves.toBe(1)

    await sleep(300)

    await expect(reusedFn()).resolves.toBe(2)
    await expect(reusedFn()).resolves.toBe(2)
    await expect(reusedFn()).resolves.toBe(2)
    await expect(reusedFn(1)).resolves.toBe(3)
    await expect(reusedFn('43')).resolves.toBe(4)
    await expect(reusedFn()).resolves.toBe(2)
  });

});
