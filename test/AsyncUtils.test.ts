import assert from "assert";
import { sleep } from "../src";
import { AsyncUtils } from "../src/async";
import { LazyPromise } from "../src/async/LazyPromise";

describe("AsyncUtils Test Suite", () => {

  it("should support filter by async predicate", async () => {

    const values = await AsyncUtils.filter([1, 2, 3, 4, 5], async (value) => {
      await sleep(1);
      return (value % 2) === 0;
    });

    assert.deepStrictEqual(values, [2, 4]);

  });

  it("should support async allSettled function", async () => {
    const values = await AsyncUtils.allSettled([Promise.resolve(1), Promise.reject(2)]);
    assert.deepStrictEqual(values, [{ status: "fulfilled", value: 1 }, { status: "rejected", reason: 2 }]);
  });

  it("should support async map function", async () => {
    const values = await AsyncUtils.map([1, 2, 3], async (value) => value * value);
    assert.deepStrictEqual(values, [1, 4, 9]);
  });

  it("should support async map downgrade to sync.map when not provide iteratee", async () => {
    const result = await AsyncUtils.map([1, 2, 3]);
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it("should throw error when async map prediction throw error", async () => {
    const p = AsyncUtils.map([1, 2, 3], async (value) => { throw new Error(); });
    await expect(p).rejects.toThrow();
  });

  it("should throw error when async filter prediction throw error", async () => {
    const p = AsyncUtils.filter([1, 2, 3], async (value) => { throw new Error(); });
    await expect(p).rejects.toThrow();
  });

  it("should support lazy promise", async () => {

    let v = 0;

    const p = new LazyPromise<number>((resolve) => {
      v = 1;
      resolve(1);
    });

    await sleep(50);
    expect(v).toBe(0);
    await p;
    expect(v).toBe(1);

    const p2 = new LazyPromise((resolve, reject) => {
      v = 2;
      reject(new Error);
    });

    await sleep(50);
    expect(v).toBe(1);
    expect(p2).rejects.toThrow();
    expect(v).toBe(2);
  });

});
