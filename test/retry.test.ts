// @ts-nocheck
import { retry } from '../src/retry';
import sleep from '../src/sleep';


describe('retry', () => {

  it('should retry multi time', async () => {

    let count = 1;
    let runCount = 0;
    async function runner(v: number): Promise<number> {
      return new Promise((resolve, reject) => {
        runCount++;
        count++;
        if (count < 10) {
          reject(count + v);
        } else {
          resolve(count + v);
        }
      });

    }

    const c = retry(runner, 10);

    expect(await c(11)).toBe(21);

  });

  it('should support retry with normal sync function', () => {

    let idx = 1;
    function r() {
      idx++;
      if (idx <= 5) {
        throw new TypeError();
      }
      return idx;
    }

    const rr = retry(r, 10);

    expect(rr()).toBe(6);

    let idx2 = 0;

    const rr2 = retry(() => { idx2++; throw new TypeError(); }, 10);

    expect(() => rr2()).toThrow(TypeError);
    expect(idx2).toBe(10);

  });

  it('should reject when retry number exceed', async () => {

    let count = 1;
    let runCount = 0;
    async function runner(v: number): Promise<number> {
      return new Promise((resolve, reject) => {
        count++;
        runCount++;
        reject(count + v);
      });

    }

    const c = retry(runner, 5);

    await expect(c(11)).rejects.toEqual(17);

    expect(runCount).toBe(5);


  });

  it('should return original function when maxNumber <= 1', () => {

    const f = async () => { };
    expect(retry(f, 1)).toBe(f);
    expect(retry(f, 0)).toBe(f);
    expect(retry(f, -123)).toBe(f);

  });

  it('should raise error when not give function', () => {

    expect(() => retry(1)).toThrow(TypeError);
    expect(() => retry()).toThrow(TypeError);
    expect(() => retry('')).toThrow(TypeError);

  });

  it('should support retry with interval', async () => {

    let idx = 0;
    const interval = 100;
    const f = retry(async () => {
      await sleep(1);
      idx++;
      if (idx <= 3) {
        throw new TypeError;
      }
      return idx;
    }, 5, interval);
    const d1 = new Date().getTime();
    expect(await f()).toBe(4);
    const diff = (new Date().getTime()) - d1;
    expect(diff).toBeGreaterThanOrEqual(3 * interval);


  });


});
