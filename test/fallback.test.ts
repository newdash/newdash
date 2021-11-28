import { sleep } from "../src";
import { fallback } from "../src/fallback";
import { TemporaryUnAvailableError } from "../src/fallback/circuit";
import { toTry } from "../src/fallback/toTry";


describe("fallback", () => {

  it("should support fallback.cache", async () => {

    let idx = 0;
    const runner = fallback.cache(async (param) => {
      idx++;
      if (idx > 1) { throw new TypeError(); }
      return idx;
    });

    expect(await runner("p1")).toBe(1);
    expect(await runner("p1")).toBe(1); // get value from cache
    expect(idx).toBe(2);

    // param with 'p2' is not have cache
    await expect(runner("p2")).rejects.toThrow(TypeError);

  });

  it("should support fallback.retry", async () => {

    let idx = 0;
    const runner = fallback.retry(async () => {
      idx++;
      if (idx < 5) { throw new TypeError(); }
      return idx;
    }, 10);

    expect(await runner()).toBe(5);

  });

  it("should support fallback.circuit", async () => {
    const openDuration = 300;
    let idx = 0;
    const runner = fallback.circuit(async (value?: any) => {
      idx++;
      if (idx <= 1) {
        throw new TypeError();
      }
      return idx;
    }, openDuration);

    await expect(runner()).rejects.toThrow(TypeError);
    // circuit breaker is open
    await expect(runner()).rejects.toThrow(TemporaryUnAvailableError);
    await expect(runner()).rejects.toThrow(TemporaryUnAvailableError);
    try {
      await runner();
    } catch (error) {
      expect(error.causeError).toBeInstanceOf(TypeError);
    }
    // but for different parameter, the circuit breaker is standalone
    expect(await runner(1)).toBe(2);

    await sleep(openDuration);
    expect(await runner()).toBe(3);

  });

  it("should support toTry multi functions", async () => {

    const f1 = () => 1;
    const f2 = () => 2;
    const f3 = () => 3;
    const fv = (v: number) => v;
    const afv = async (v: number) => v;

    const af1 = async () => 1;
    const af2 = async () => 2;
    const af3 = async () => 3;
    const fe = () => { throw new Error(); };
    const afe = async () => { throw new Error; };

    // expect(toTry(f1, f2, f3)()).toBe(1);
    // expect(toTry(fe, fe, f3)()).toBe(3);
    expect(toTry(fe, fe, fv)(123)).toBe(123);
    // await expect(toTry(af1, af2, af3)()).resolves.toBe(1);
    // await expect(toTry(af3, afe, af3)()).resolves.toBe(3);
    // await expect(toTry(afe, afe, afv)(123)).resolves.toBe(123);


  });

});
