// @ts-nocheck
import { retry } from '../src/retry';


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


});
